import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Search from './components/Search';
import EditTournament from './components/EditTournament';
import ManageTournaments from './components/ManageTournaments';
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/profile'; // Add this import

function App() {
  return (
    <Router>
      <Navbar /> {/* Always show navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registeruser" element={<RegisterUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/manage" element={<ManageTournaments />} />
        <Route path="/edit/:id" element={<EditTournament />} />
        <Route path="/profile" element={<Profile />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;