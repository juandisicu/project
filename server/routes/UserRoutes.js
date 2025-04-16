const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
  console.log('Registration attempt with data:', req.body);
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      console.log('User already exists with this username or email');
      return res.status(400).json({ 
        message: 'Username or email already in use' 
      });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();
    console.log('User registered successfully:', username);
    
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('❌ Error during registration:', error);
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  console.log('Login attempt received for username:', req.body.username);
  
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    console.log('Missing username or password in request');
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    console.log('Searching for user in database...');
    const user = await User.findOne({ username });
    
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    console.log('User found, comparing passwords...');
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    console.log('Password matched, generating token...');
    // Make sure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    console.log('Login successful for user:', username);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('❌ Detailed error during login:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Authentication middleware
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get user profile (protected route)
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile (protected route)
router.put('/profile', protect, async (req, res) => {
  const { username, email } = req.body;

  try {
    // Check if the new username/email is already taken by another user
    if (username || email) {
      const existingUser = await User.findOne({
        $and: [
          { _id: { $ne: req.user.userId } },
          { $or: [
            username ? { username } : { _id: null },
            email ? { email } : { _id: null }
          ]}
        ]
      });

      if (existingUser) {
        return res.status(400).json({ 
          message: 'Username or email already in use by another account' 
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { username, email },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error('❌ Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  // Since JWT is stateless, actual logout happens on client side
  // by removing the token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;