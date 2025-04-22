import React,{useState,useEffect} from "react";
import axios from "axios";
import { Card,CardBody } from "react-bootstrap";

const Submissionlist = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/submissions")
            .then(response => setSubmissions(response.data))
            .catch(error => console.error(error));
    }, []);
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
)};

export default Submissionlist;