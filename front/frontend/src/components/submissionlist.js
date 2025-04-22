import React,{useState,useEffect} from "react";
import axios from "axios";
import { Card,CardBody,Row } from "react-bootstrap";
import { Github, Video } from "lucide-react";

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
                <Row xs={1} md={2} lg={3} className="g-4">
                        {submissions.map((submission, index) => (
                            <Card key={submission._id}>
                                <CardBody>
                                    <h5 className="card-title">Team ID: {submission.team_id}</h5>
                                    <h5 className="card-title">Title: {submission.title}</h5>
                                    <a className="card-text" href={submission.gitrepo}><Github/></a>
                                    <a className="card-text" href={submission.vid}><Video /></a>
                                    {/* yet to add submission date */}
                                    <p className="card-text">Submission Date: {new Date(submission.submission_date).toLocaleDateString()}</p>
                                    <p className="card-text">Status: {submission.status}</p>
                                </CardBody>
                            </Card>
                        ))}
                        </Row>
    </div>
                  
)};

export default Submissionlist;