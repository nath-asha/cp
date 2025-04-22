import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Nav, Tab, Row, Col, Table, CardBody,Button } from "react-bootstrap";
import { Github } from "lucide-react";

function Organiserdash() {
    const [stats, setStats] = useState({ participants: 0, problems: 0, submissions: 0 });
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/stats")
            .then(response => setStats(response.data))
            .catch(error => console.error(error));
    }, []);

    //for events as cards
    const [events, setEvents] = useState([]);
    const [eventSearch, setEventSearch] = useState('');
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/events');
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setEvents(data);
          } catch (err) {
            console.error('Error fetching events data:', err);
          }
        };
    
        fetchData();
      }, []);

      
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/participants")
            .then(response => setParticipants(response.data))
            .catch(error => console.error(error));
    }, []);

    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/participants")
            .then(response => setMentors(response.data))
            .catch(error => console.error(error));
    }, []);

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

    const filteredChallenges = problems.filter(problem => 
        problem.title.toLowerCase().includes(search.toLowerCase())
    );

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
                        <button onClick={() => window.location.href = '/participantlist'}>Manage Participants</button>
                        </div>
                        </div>
                        <button onClick={() => window.location.href = '/mentorlist'}>Manage Mentors</button>       
                    </div>

                    <div className="col">
                        <div className="card text-white bg-primary">
                            <div className="card-body">
                                <h5 className="card-title">Problem Statements</h5>
                                <p className="card-text">{stats.problems}</p>
                                <button onClick={() => window.location.href = '/problemlist'}>Manage PS</button>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card text-white bg-primary">
                            <div className="card-body">
                                <h5 className="card-title">Submissions</h5>
                                <p className="card-text">{stats.submissions}</p>
                                <button onClick={() => window.location.href = '/submissionlist'}>Manage Submissions</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-black"> Event Management </h2>
                <h4>Total Number of Events {stats.eventcount}</h4>
                <Row xs={2} md={3} lg={4} xl={6} className="g-4">
                {events.map(event => (
                    <div key={event._id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={event.imgUrl} className="card-img-top" alt={event.title} />
                            <div className="card-body">
                                <h5 className="card-title">{event.title}</h5>
                                <p className="card-text">Event ID: {event.eventId}</p>
                                <p className="card-text">{event.desc}</p>
                                <p className="card-text">{event.date}</p>
                                <p className="card-text">{event.venue}</p>
                            </div>
                        </div>
                    </div>
                ))} 
                </Row>
                <button onClick={() => window.location.href = '/eventlist'}>Manage Events page</button>
            </div>
            <div className="col-md-4">
              <h5 className='text-black'>Things needed</h5>
              <input type='checkbox' /> <p>chairs 100</p><br />
              <input type='checkbox' /> <p>tables 50</p><br />
              <input type='checkbox' /> <p>projectors 2</p><br />
              <input type='checkbox' /> <p>water bottles for guests</p><br />
              <input type='checkbox' /> <p>snacks for guests</p><br />
              </div>
            {/* <div>
                <h2 className="text-black">Participants</h2>
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
                                <td>{p.firstName} {p.lastName}</td>
                                <td>{p.email}</td>
                                <td><a href={p.github_url}><Github /></a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}

            {/* <div>
                <h2 className="text-black">Mentors</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            {/* <th>Github</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {mentors.map((m, index) => (
                            m.role === 'Mentor' ? (
                            <tr key={m._id}>
                                <td>{index + 1}</td>
                                <td>{m.firstName} {m.lastName}</td>
                                <td>{m.email}</td>
                                <td>{m.team_id}</td>
                                {/* <td><a href={m.github_url}><Github /></a></td> 
                            </tr>
                            ) : null
                        ))}
                    </tbody>
                </table>
            </div> */}

            {/* <div>
                <h2 className="text-black">Problem Statements</h2>
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
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* <div>
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
            </div> */}
        </div>
    );
}

export default Organiserdash;