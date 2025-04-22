import React, { useState, useEffect } from "react";
import axios from "axios";
import { Github, Linkedin, LinkIcon } from "lucide-react";

const MentorManager = () => {
    const [mentors, setMentors] = useState([]);
    const [currentMentor, setCurrentMentor] = useState(null);
    const [search, setSearch] = useState("");
    const renderMentorCards = () => {
        return filteredMentors.map((m) => (
            <div key={m._id} className="card mb-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">
                        {m.firstName} {m.lastName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{m.email}</h6>
                    <a href={m.github_url} className="card-link">
                        <Github />
                    </a>
                    <div className="mt-3">
                        <button
                            onClick={() => handleEdit(m)}
                            className="btn btn-primary btn-sm me-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm(`Are you sure you want to delete ${m.firstName} ${m.lastName}?`)) {
                                    handleDelete(m._id);
                                }
                            }}
                            className="btn btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        ));
    };
    useEffect(() => {
        axios.get("http://localhost:5000/participants")
            .then(response => setMentors(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/participants${id}`);
            setMentors(mentors.filter((mentor) => mentor._id !== id));
        } catch (error) {
            console.error("Error deleting mentor:", error);
        }
    };

    const filteredMentors = mentors.filter((m) =>
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (mentor) => {
        setCurrentMentor(mentor);
    };

    return (
        <div>
            <h2 className="text-black">Mentors</h2>
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
                        <th>Linkedin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMentors.map((m, index) => (
                        m.role === 'Mentor' ?(
                        <tr key={m._id}>
                            <td>{index + 1}</td>
                            <td>
                                {m.firstName} {m.lastName}
                            </td>
                            <td>{m.email}</td>
                            <td>
                                <a href={m.github_url}>
                                    <Github />
                                </a>
                            </td>
                            <td>
                                <a href={m.linkedin_url}>
                                    <Linkedin/>
                                </a>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEdit(m)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        if (window.confirm(`Are you sure you want to delete ${m.firstName} ${m.lastName}?`)) {
                                            handleDelete(m._id);
                                        }
                                    }}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        ): null
                    ))}
                </tbody>
            </table>
            <div className="row">
            {filteredMentors.map((m, index) => (
                        m.role === 'Mentor' ?(
                            <div key={m._id} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {m.firstName} {m.lastName}
                                        </h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{m.email}</h6>
                                        <a href={m.github_url} className="card-link">
                                            <Github />
                                        </a>
                                        <a href={m.linkedin_url} className="card-link">
                                            <Linkedin/>
                                        </a>
                                        <div className="mt-3">
                                            <button
                                                onClick={() => handleEdit(m)}
                                                className="btn btn-primary btn-sm me-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`Are you sure you want to delete ${m.firstName} ${m.lastName}?`)) {
                                                        handleDelete(m._id);
                                                    }
                                                }}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        ): null
            ))};
            </div>
        </div>
    );
};

export default MentorManager;