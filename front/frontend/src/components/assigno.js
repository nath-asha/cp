import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,useEffect} from 'react';
const Assignmentees = () => {
  const [mentors, setMentors] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    fetchMentors();
    fetchTeams();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/mentors"); // filter users with mentor role
      setMentors(res.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/unassigned-teams");
      setTeams(res.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleAssign = async () => {
    if (!selectedMentor || selectedTeams.length === 0) {
      alert("Please select a mentor and at least one team!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/assign-mentor", {
        mentorId: selectedMentor,
        teamIds: selectedTeams
      });
      alert("Mentor assigned successfully!");
      fetchTeams(); // Refresh teams after assignment
      setSelectedMentor("");
      setSelectedTeams([]);
    } catch (error) {
      console.error("Error assigning mentor:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Assign Mentor to Teams</h2>
      
      <div className="mb-3">
        <label className="form-label">Select Mentor:</label>
        <select 
          className="form-select" 
          value={selectedMentor} 
          onChange={(e) => setSelectedMentor(e.target.value)}
        >
          <option value="">-- Select Mentor --</option>
          {mentors.map((mentor) => (
            <option key={mentor._id} value={mentor._id}>
              {mentor.firstName} {mentor.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Select Teams:</label>
        <select 
          className="form-select" 
          multiple 
          value={selectedTeams} 
          onChange={(e) => {
            const options = Array.from(e.target.selectedOptions, option => option.value);
            setSelectedTeams(options);
          }}
        >
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name} (ID: {team.team_id})
            </option>
          ))}
        </select>
        <small className="text-muted">Hold Ctrl (Windows) / Command (Mac) to select multiple.</small>
      </div>

      <button className="btn btn-primary" onClick={handleAssign}>
        Assign Mentor
      </button>
    </div>
  );
};

export default Assignmentees;
