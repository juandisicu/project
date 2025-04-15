import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import EditTournament from './components/EditTournament';
import ManageTournaments from './components/ManageTournaments';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/manage" element={<ManageTournaments />} />
        <Route path="/edit/:id" element={<EditTournament />} />
      </Routes>
    </Router>
  );
}

export default App;
