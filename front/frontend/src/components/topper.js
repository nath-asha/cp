import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
// import { useParams } from "react-router-dom";
import { Container,Nav,Tab } from "react-bootstrap";

const Displayevent = () => {
    // const {trackId} = useParams();
const [events, setEvents] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            // const response = await fetch(`http//localhost:5000/challenges/${trackId}`);
            const response = await fetch(`http://localhost:5000/challenges`);

            if (!response.ok) {
                throw new Error(`HTTP error Status: ${response.status}`);               
            }
            const data = await response.json();
            setEvents(data);
        } catch (err) {
            console.error('Error fetching challenges :',err)
        }
    };
    fetchData();
// },[trackId]);
},[]);


return(
 <div>
    {events.length > 0 ? (
    <div>
       <h2>{events.title}</h2>
        {/* description, imgurl, trackid */}
        <Container>
            <Tab.Container defaultActiveKey='overview'>
                <Nav variant="tabs" className="mb-4">
                    <Nav.Item>
                        <Nav.Link eventKey="overview" className="px-4">Overview </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="prizes" className="px-4">prizes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="schedule" className="px-4">schedule </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="importantdates" className="px-4">Important dates</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="challenges" className="px-4">Problem  statements</Nav.Link>
                    </Nav.Item>
                    {/* After event concludes project gallery or only top 3 projects with makers
                    <Nav.Item>
                        <Nav.Link eventKey="projects" className="px-4">projects </Nav.Link>
                    </Nav.Item> */}
                </Nav>
            </Tab.Container>
        </Container>
    </div>
    ) : (
        <p>No challenges found for this track.</p>
      )}
    </div>
)

};
export default Displayevent;