import { useState,useEffect} from 'react';
import React from "react";
import { Clock, Calendar, Award, Users, Code, Coffee, Bell } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Demodash() {
    const [users, setUsers] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [teams, setTeams] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/submissions'); // Updated API route
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setTeams(data);
            console.log(data);
          } catch (err) {
            console.error('Error fetching problem statement data:', err);
          }
        };

    return(
    <div className='container-md '>
        <div className='Grid'>
            <div className='Row'>
                <div className='col'>
                    <h2 className='text-black'>Dashboard</h2>

                </div>
            </div>
        </div>
    </div>
    )};

export default Demodash;