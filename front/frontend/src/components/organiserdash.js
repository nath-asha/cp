import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,CardBody } from "react-bootstrap";
import { Github } from "lucide-react";


function Organiserdash() {
    const [stats, setStats] = useState({ participants: 0, problems: 0, submissions: 0 });
    const [challenges,setchallenges] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/api/stats")
        .then(response => setStats(response.data))
        .catch(error => console.error(error));
    }, []);
  
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/participants")
        .then(response => setParticipants(response.data))
        .catch(error => console.error(error));
    }, []);

    const [problems, setProblems] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/challenges")
        .then(response => setProblems(response.data))
        .catch(error => console.error(error));
    }, []);

    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/submissions")
        .then(response => setSubmissions(response.data))
        .catch(error => console.error(error));
    }, []);
    
    return (
        <div className="container-fluid">
    <div>
        <h2>Dashboard</h2>
        <div className="row">
            <div className="col">
                <div className="card text-white bg-primary">
                    <div className="card-body">
                        <h5 className="card-title">Participants</h5>
                        <p className="card-text">{stats.participants}</p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card text-white bg-success">
                    <div className="card-body">
                        <h5 className="card-title">Problem Statements</h5>
                        <p className="card-text">{stats.problems}</p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card text-white bg-warning">
                    <div className="card-body">
                        <h5 className="card-title">Submissions</h5>
                        <p className="card-text">{stats.submissions}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div>
        <h2 className="text-black"> Event Management </h2>
        <h4>Total Number of Events {stats.eventcount}</h4>
        <button onClick={() => window.location.href = '/eventlist'}>Events page</button>
    </div>
    <div>
        <h2>Participants</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Github</th>
                </tr>
            </thead>
            <tbody>
                {participants.map((p, index) => (
                    <tr key={p._id}>
                        <td>{index + 1}</td>
                        <td>{p.firstName}  {p.lastName}</td>
                        <td>{p.email}</td>
                        <td><a href={p.github_url}><Github /></a></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    <div>
                <h2 className="text-black">Problem Statements</h2>
                <div className="row">
                    {problems.map((problem) => (
                        <div className="col-md-4 mb-4" key={problem._id}>
                            <Card>
                                <CardBody>
                                    <h5 className="card-title">{problem.title}</h5>
                                    <p className="card-text">{problem.description}</p>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>


    <div>
        <h2>Submissions</h2>
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
</div>
  );
}

export default Organiserdash;




   