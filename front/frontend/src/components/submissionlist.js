import React,{useState,useEffect} from "react";
import axios from "axios";
import { Card,CardBody } from "react-bootstrap";
import { Github } from "lucide-react";

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
                        {submissions.map((submission, index) => (
                            <Card key={submission._id}>
                                <CardBody>
                                    <h5 className="card-title">Submission ID: {submission._id}</h5>
                                    <p className="card-text">Team ID: {submission.team_id}</p>
                                    <a className="card-text" href={submission.gitrepo}><Github/></a>
                                    {/* yet to add submission date */}
                                    <p className="card-text">Submission Date: {new Date(submission.submission_date).toLocaleDateString()}</p>
                                    <p className="card-text">Status: {submission.status}</p>
                                </CardBody>
                            </Card>
                        ))}
    </div>
                  
)};

export default Submissionlist;