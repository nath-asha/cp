import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const Sendteamreq = () => {
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch users and teams
        axios.get("http://localhost:5000/users").then((response) => setUsers(response.data));
        axios.get("http://localhost:5000/teams").then((response) => setTeams(response.data));
    }, []);

    const sendRequest = () => {
        if (!selectedRecipient || !message) {
            alert("Please select a recipient and enter a message.");
            return;
        }

        axios
            .post("/api/send-request", {
                recipient: selectedRecipient,
                message: message,
            })
            .then((response) => {
                alert("Request sent successfully!");
                setSelectedRecipient("");
                setMessage("");
            })
            .catch((error) => {
                console.error("Error sending request:", error);
                alert("Failed to send request.");
            });
    };

    return (
        <Card className="p-4">
            <h3 className="text-center mb-4">Send Request</h3>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>
                        Recipient
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Select
                            value={selectedRecipient}
                            onChange={(e) => setSelectedRecipient(e.target.value)}
                        >
                            <option value="">Select Recipient</option>
                            <optgroup label="Users">
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}
                            </optgroup>
                            <optgroup label="Teams">
                                {teams.map((team) => (
                                    <option key={team._id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </optgroup>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>
                        Message
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Enter your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Row className="text-center">
                    <Col>
                        <Button variant="primary" onClick={sendRequest}>
                            Send Request
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default Sendteamreq;
