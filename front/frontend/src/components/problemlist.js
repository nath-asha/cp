import React,{useState,useEffect} from "react";
import axios from "axios";
import { View } from "lucide-react";
import { Card,CardBody } from "react-bootstrap";

const Problemlist = () => {
    const [problems, setProblems] = useState([]);
    const [search, setSearch] = useState('');
    const [currentChallenge, setCurrentChallenge] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/challenges")
            .then(response => setProblems(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/challenges/${id}`);
            setProblems(problems.filter(problem => problem._id !== id));
        } catch (err) {
            console.error('Error deleting challenge:', err);
        }
    };

    const handleEdit = (problem) => {
        setCurrentChallenge(problem);
    }

    const filteredChallenges = problems.filter(problem => problem.title.toLowerCase().includes(search.toLowerCase()));
    const filteredChallenge = problems.filter(problem => problem.eventId.toLowerCase().includes(search.toLowerCase()));


return(
    <div className="container">
        <h2 className="text-black">Problem Statements</h2>
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
        {filteredChallenges.map((problem) => (
            <div className="col-md-4 mb-4" key={problem._id}>
                <Card>
                    <CardBody>
                        <h5 className="card-title">{problem.title}</h5>
                        <p className="card-text">{problem.description}</p>
                        <button><a onClick={() => handleEdit(problem)}>Edit</a></button>
                        <button className='btn bg-danger text-white' onClick={() => { if (window.confirm(`Are you sure you want to delete ${problem.title}?`)) {
                                            handleDelete(problem._id);
                                        }}}><a>Delete</a></button>
                    </CardBody>
                </Card>
            </div>
        ))}
    </div>
</div>
<div className="col">
    <input 
        type="text"
        placeholder="search by Event ID"
        value={search}
        onChange={(e => setSearch(e.target.value))}
        className="search-input"
    />
    <div className="row">
        {filteredChallenge.map((problem) => (
            <div className="col-md-4 mb-4" key={problem._id}>
                <Card>
                    <CardBody>
                        <h5 className="card-title">{problem.title}</h5>
                        <p className="card-text">{problem.description}</p>
                        <button><a onClick={() => handleEdit(problem)}>Edit</a></button>
                        <button className='btn bg-danger text-white' onClick={() => { if (window.confirm(`Are you sure you want to delete ${problem.title}?`)) {
                                            handleDelete(problem._id);
                                        }}}><a>Delete</a></button>
                    </CardBody>
                </Card>
            </div>
        ))}
        </div>
        </div>
    </div>
</div>
)
};

export default Problemlist;