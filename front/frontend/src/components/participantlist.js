import React, { useState, useEffect } from "react";
import axios from "axios";
import { Github } from "lucide-react";

const ParticipantManager = () => {
    const [participants, setParticipants] = useState([]);
    const [currentParticipant, setCurrentParticipant] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/participants")
            .then((response) => setParticipants(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/participants/${id}`);
            setParticipants(participants.filter((participant) => participant._id !== id));
        } catch (error) {
            console.error("Error deleting participant:", error);
        }
    };

    const filteredParticipants = participants.filter((p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (participant) => {
        setCurrentParticipant(participant);
    };

    return (
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
                    {filteredParticipants.map((p, index) => (
                        <tr key={p._id}>
                            <td>{index + 1}</td>
                            <td>
                                {p.firstName} {p.lastName}
                            </td>
                            <td>{p.email}</td>
                            <td>
                                <a href={p.github_url}>
                                    <Github />
                                </a>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEdit(p)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        if (window.confirm(`Are you sure you want to delete ${p.firstName} ${p.lastName}?`)) {
                                            handleDelete(p._id);
                                        }
                                    }}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParticipantManager;