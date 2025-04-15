import { useParams } from 'react-router-dom';
import TournamentForm from '../components/TournamentForm';

function EditTournament() {
  const { id } = useParams();
  const tournaments = JSON.parse(localStorage.getItem('tournaments')) || [];

  const tournamentToEdit = tournaments[id];

  const handleSave = (updatedTournament) => {
    tournaments[id] = updatedTournament;
    localStorage.setItem('tournaments', JSON.stringify(tournaments));
  };

  return (
    <div>
      <TournamentForm onSave={handleSave} tournamentToEdit={tournamentToEdit} />
    </div>
  );
}

export default EditTournament;