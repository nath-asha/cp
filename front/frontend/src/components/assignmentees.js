import react, {useEffect,useState} from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const Assignmentees = () => {
    const [assignments, setAssignments] = useState([]);
    const [search, setSearch] = useState('');
    const [mentors, setMentors] = useState([]);
    const [currentMentor, setCurrentMentor] = useState(null);
    const [currentAssignment, setCurrentAssignment] = useState(null);


    useEffect(() => {
            axios.get("http://localhost:5000/participants")
                .then(response => setMentors(response.data))
                .catch(error => console.error(error));
        }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/teams")
            .then(response => setAssignments(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/assignments/${id}`);
            setAssignments(assignments.filter(assignment => assignment._id !== id));
        } catch (err) {
            console.error('Error deleting assignment:', err);
        }
    };

    const handleEdit = (assignment) => {
        setCurrentAssignment(assignment);
    }

    const assignmentees = async (teamId, mentorId) => {{
        try{
            const response = await axios.post(`http://localhost:5000/assignments`, { teamId, mentorId });
            if (response.status === 200) {
                console.log('Assignment successful:', response.data);
            } else {
                console.error('Error assigning:', response.statusText);
            }
        }catch(err){
            console.error('Error assigning mentor:',err);
        }
    }}

    const filteredAssignments = assignments.filter(assignment => assignment.title.toLowerCase().includes(search.toLowerCase()));

    return(
        <div className="container">
            <h2 className="text-black">Assignments</h2>
            <div className="row">
                <div className="col">
                    <input 
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                    <div className="row">
                        {filteredAssignments.map((assignment) => (
                            <div className="col-md-4 mb-4" key={assignment._id}>
                                <Card>
                                    <Card.Body>
                                        <h5 className="card-title">{assignment.name} {assignment.team_id}</h5>
                                        <p className="card-text">{assignment.project}</p>
                                        <button>Assign</button>
                                        <button><a onClick={() => handleEdit(assignment)}>Edit</a></button>
                                        <button className='btn bg-danger text-white' onClick={() => { if (window.confirm(`Are you sure you want to delete ${assignment.title}?`)) {
                                            handleDelete(assignment._id);
                                        }}}><a>Delete</a></button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assignmentees;