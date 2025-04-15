import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // ⬅️ Import the navbar
import Home from './components/Home';
import Search from './components/Search';
import EditTournament from './components/EditTournament';
import ManageTournaments from './components/ManageTournaments';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Always show navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/manage" element={<ManageTournaments />} />
        <Route path="/edit/:id" element={<EditTournament />} />
        {/* Future authenticated routes */}
        <Route path="/users" element={<div>Users Page</div>} />
        <Route path="/profile" element={<div>My Profile Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
