import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useParams } from "react-router-dom";

const Displayevent = () => {
    const {trackId} = useParams();
const [events, setEvents] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http//localhost:5000/challenges/${trackId}`);
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
},[trackId]);

return(
    <div>
        <h2></h2>
    </div>
)

};
export default Displayevent;