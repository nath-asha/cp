import react, {useEffect,useState} from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const Assignmentees = () => {
    const [assignments, setAssignments] = useState([]);
    const [search, setSearch] = useState('');
    const [currentAssignment, setCurrentAssignment] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/assignments")
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
                                        <h5 className="card-title">{assignment.title}</h5>
                                        <p className="card-text">{assignment.description}</p>
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
}

export default Assignmentees;