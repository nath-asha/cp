import react,{ useState,useEffect } from "react";
import { Row } from "react-bootstrap";
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
        <div>
            <h3>Send Request</h3>
            <Row>
                <select
                    value={selectedRecipient}
                    onChange={(e) => setSelectedRecipient(e.target.value)}
                >
                    <option value="">Select Recipient</option>
                    <optgroup label="Users">
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </optgroup>
                    <optgroup label="Teams">
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </optgroup>
                </select>
            </Row>
            <Row>
                <textarea
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Row>
            <Row>
                <button onClick={sendRequest}>Send Request</button>
            </Row>
        </div>
    )
};

export default Sendteamreq;
