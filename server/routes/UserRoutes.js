const express = require('express');
const User = require('../models/User'); 
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const newUser = new User({ email, password, name });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    console.error('❌ Error registering user:', error);
    res.status(400).json({ message: 'Error registering user', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
