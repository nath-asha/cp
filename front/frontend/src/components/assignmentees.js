// import React, { useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';
// import axios from 'axios';

// const Assignmentees = () => {
//     const [teams, setTeams] = useState([]);
//     const [mentors, setMentors] = useState([]);
//     const [search, setSearch] = useState('');
//     const [selectedMentors, setSelectedMentors] = useState({});

//     // Fetch mentors from users collection (only mentors)
//     useEffect(() => {
//         axios.get('http://localhost:5000/mentors')
//             .then(res => setMentors(res.data))
//             .catch(err => console.error('Error fetching mentors:', err));
//     }, []);
//     // useEffect(() => {
//     //     axios.get('http://localhost:5000/participants') 
//     //         .then(res => {
//     //             // Assuming you want to filter out a mentor with a specific id
//     //             const filteredMentors = res.data.filter((mentor) => mentor._id !== id);
//     //             setMentors(filteredMentors);
//     //         })
//     //         .catch(err => console.error('Error fetching mentors:', err));
//     // }, [id]);
    

//     // Fetch teams
//     useEffect(() => {
//         axios.get('http://localhost:5000/teams')
//             .then(res => setTeams(res.data))
//             .catch(err => console.error('Error fetching teams:', err));
//     }, []);

//     // Handle mentor dropdown change
//     const handleMentorChange = (teamId, mentorId) => {
//         setSelectedMentors(prev => ({ ...prev, [teamId]: mentorId }));
//     };

//     // Assign mentor to team
//     const handleAssign = async (teamId) => {
//         const mentorId = selectedMentors[teamId];
//         if (!mentorId) {
//             alert('Please select a mentor before assigning.');
//             return;
//         }

//         try {
//             const res = await axios.post('http://localhost:5000/assignments', { teamId, mentorId });
//             if (res.status === 200) {
//                 alert('Team assigned successfully!');
//             }
//         } catch (err) {
//             console.error('Error assigning team:', err);
//             alert('Failed to assign team. Please try again.');
//         }
//     };

//     // Delete assignment (optional feature)
//     const handleDelete = async (assignmentId) => {
//         if (!window.confirm('Are you sure you want to delete this assignment?')) return;

//         try {
//             await axios.delete(`http://localhost:5000/assignments/${assignmentId}`);
//             alert('Assignment deleted successfully.');
//             // You may refetch assignments or update local state here
//         } catch (err) {
//             console.error('Error deleting assignment:', err);
//         }
//     };

//     const filteredTeams = teams.filter(team =>
//         team.name?.toLowerCase().includes(search.toLowerCase())
//     );

//     console.log(mentors);


//     return (
//         <div className="container">
//             <h2 className="text-black my-3">Assign Teams to Mentors</h2>

//             <input
//                 type="text"
//                 placeholder="Search teams"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="form-control mb-4"
//             />

//             <div className="row">
//                 {filteredTeams.map((team) => (
//                     <div className="col-md-4 mb-4" key={team._id}>
//                         <Card>
//                             <Card.Body>
//                                 <h5 className="card-title">{team.name}</h5>
//                                 <p className="card-text">Project: {team.project}</p>

//                                 <select
//                                     className="form-select mb-2"
//                                     value={selectedMentors[team._id] || ''}
//                                     onChange={(e) => handleMentorChange(team._id, e.target.value)}
//                                 >
//                                     <option  value="">Select Mentor</option>
//                                     {mentors.map(mentor => (
//                                         <option  key={mentor._id} value={mentor._id}>
//                                             {mentor.firstName} {mentor.lastName}
//                                         </option>
//                                     ))}
//                                 </select>

//                                 <button
//                                     className="btn btn-success me-2"
//                                     onClick={() => handleAssign(team._id)}
//                                 >
//                                     Assign
//                                 </button>

//                                 <button
//                                     className="btn btn-danger"
//                                     onClick={() => handleDelete(team.assignmentId)}
//                                 >
//                                     Delete Assignment
//                                 </button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Assignmentees;import axios from "axios";import React, { useEffect, useState } from "react";
import { Card, Button, Form, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import react, {useState,useEffect} from 'react';
import axios from 'axios';

const Assignmentees = () => {
  const [mentors, setMentors] = useState([]);
  const [teams, setTeams] = useState([]);
  const [unassignedTeams, setUnassignedTeams] = useState([]);
  const [search, setSearch] = useState('');

  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [assignedMentors, setAssignedMentors] = useState({});

  useEffect(() => {
    fetchMentors();
    fetchTeams();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/mentors");
      setMentors(res.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/teams");
      setTeams(res.data);

      const unassigned = res.data.filter(team => !team.mentor);
      setUnassignedTeams(unassigned);

      const initialAssignments = {};
      res.data.forEach(team => {
        if (team.mentor) {
          initialAssignments[team._id] = team.mentor;
        }
      });
      setAssignedMentors(initialAssignments);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  // Bulk Assign Handler
  const handleBulkAssign = async () => {
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
      fetchTeams();
      setSelectedMentor('');
      setSelectedTeams([]);
    } catch (error) {
      console.error("Error assigning mentor (bulk):", error);
      alert("Failed to assign mentor (bulk).");
    }
  };

  // Single Team Assign Handler
  const handleSingleAssign = async (teamId) => {
    const mentorId = assignedMentors[teamId];
    if (!mentorId) {
      alert('Please select a mentor.');
      return;
    }
    console.log(`Attempting to assign mentor ${mentorId} to team ID: ${teamId}`);
    try {
      const response = await axios.put(`http://localhost:5000/teams/${teamId}`, { mentor: mentorId });
      console.log("Single assignment successful:", response.data); // Log the response
      alert('Mentor assigned successfully!');
      fetchTeams();
    } catch (error) {
      console.error('Error assigning mentor (single):', error);
      alert('Failed to assign mentor (single).');
    }
  };

  // Unassign Handler
  const handleUnassign = async (teamId) => {
    if (!window.confirm('Are you sure you want to unassign this mentor?')) return;
    try {
      const response = await axios.put(`http://localhost:5000/teams/${teamId}`, { mentor: null });
      console.log("Unassign successful:", response.data); // Log the response
      alert('Mentor unassigned successfully!');
      fetchTeams();
    } catch (error) {
      console.error('Error unassigning mentor:', error);
      alert('Failed to unassign mentor.');
    }
  };

  const filteredTeams = teams.filter(team =>
    team.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      {/* Bulk Assignment Section */}
      <h2 className="text-center text-primary mb-4">Bulk Assign Mentor to Teams</h2>

      <div className="mb-3">
        <Form.Label>Select Mentor:</Form.Label>
        <Form.Select
          value={selectedMentor}
          onChange={(e) => setSelectedMentor(e.target.value)}
        >
          <option value="">-- Select Mentor --</option>
          {mentors.map(mentor => (
            <option key={mentor._id} value={mentor._id}>
              {mentor.firstName} {mentor.lastName}
            </option>
          ))}
        </Form.Select>
      </div>

      <div className="mb-3">
        <Form.Label>Select Teams (Unassigned Only):</Form.Label>
        <Form.Select
          multiple
          value={selectedTeams}
          onChange={(e) => {
            const options = Array.from(e.target.selectedOptions, option => option.value);
            setSelectedTeams(options);
          }}
        >
          {unassignedTeams.map(team => (
            <option key={team._id} value={team._id}>
              {team.name} (ID: {team.team_id})
            </option>
          ))}
        </Form.Select>
        <small className="text-muted">Hold Ctrl (Windows) / Command (Mac) to select multiple.</small>
      </div>

      <div className="mb-5">
        <Button variant="primary" onClick={handleBulkAssign}>
          Assign Mentor to Selected Teams
        </Button>
      </div>

      {/* Individual Assignment Section */}
      <h2 className="text-center text-success mb-4">Manage Team Mentor Assignments</h2>

      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search teams by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <div className="row">
        {filteredTeams.length === 0 ? (
          <div className="text-center text-muted">No teams found.</div>
        ) : (
          filteredTeams.map(team => {
            const currentMentor = mentors.find(m => m._id === team.mentor);
            const selectedMentorId = assignedMentors[team._id] || '';

            return (
              <div className="col-md-6 col-lg-4 mb-4" key={team._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-primary">{team.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Project: {team.project || 'N/A'}
                    </Card.Subtitle>

                    <Form.Group className="mb-3">
                      <Form.Label>Current Mentor:</Form.Label>
                      <div className="fw-bold">
                        {currentMentor ? `${currentMentor.firstName} ${currentMentor.lastName}` : 'Not Assigned'}
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Select Mentor:</Form.Label>
                      <Form.Select
                        value={selectedMentorId}
                        onChange={(e) => setAssignedMentors(prev => ({
                          ...prev,
                          [team._id]: e.target.value
                        }))}
                      >
                        <option value="">-- Select Mentor --</option>
                        {mentors.map(mentor => (
                          <option key={mentor._id} value={mentor._id}>
                            {mentor.firstName} {mentor.lastName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Button
                        variant="success"
                        onClick={() => handleSingleAssign(team._id)}
                        disabled={!selectedMentorId || selectedMentorId === team.mentor}
                      >
                        {selectedMentorId === team.mentor ? 'Assigned' : 'Assign'}
                      </Button>

                      <Button
                        variant="outline-danger"
                        onClick={() => handleUnassign(team._id)}
                        disabled={!team.mentor}
                      >
                        Unassign
                      </Button>
                    </div>

                  </Card.Body>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Assignmentees;