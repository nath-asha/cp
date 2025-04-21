import React,{ useState,useEffect } from "react";
import { Card, Container, Nav, Tab, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import {Github} from 'lucide-react';

const ParticipantManager = () => {
    const [participants, setParticipants] = useState([]);
    const [currentParticipant, setCurrentparticipant] = useState(null);
    const [search, setSearch] = useState('');
    useEffect(() => {
        axios.get("http://localhost:5000/participants")
            .then(response => setParticipants(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/participants/${id}`);
            setParticipants(participants.filter(participant => participant._id !== id));
        } catch (error) {
            console.error('Error deleting participant:', error);
        }
    };

    const handleEdit = (participant
    ) => {
        setCurrentparticipant(participant);
    };

    const filteredParticipants = participants.filter(participant =>
        participant.title.toLowerCase().includes(search.toLowerCase())
    );


return(
        <div>
            <h2 className="text-black">Participants</h2>
            <input
              type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control mb-3"
            />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Github</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((p, index) => (
                            <tr key={p._id}>
                                <td>{index + 1}</td>
                                <td>{p.firstName} {p.lastName}</td>
                                <td>{p.email}</td>
                                <td><a href={p.github_url}><Github /></a></td>
                                <td><button
                                    onClick={() => handleEdit(participants)}
                                    className="btn btn-warning me-2">
                                    Edit
                                </button>
                                </td>
                                <td>
                                <button
                                    onClick={() => {
                                        if (window.confirm(`Are you sure you want to delete event ${participants.title}?`)) {
                                            handleDelete(participants._id);
                                        }
                                    }}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )
}

export default ParticipantManager;