import React,{useState,useEffect} from "react";
import axios from "axios";
import { View } from "lucide-react";

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
    

return(
<div>
    <h2 className="text-black">Submissions</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Team</th>
                            <th>Problem</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={submission._id}>
                                <td>{index + 1}</td>
                                <td>{submission.team_id}</td>
                                <td>{submission.gitrepo}</td>
                                <td>
                                    <a href={submission.gitrepo} target="_blank" rel="noopener noreferrer">
                                        View
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
</div>
)
};

export default Problemlist;