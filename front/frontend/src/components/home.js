import React from 'react';
// import RegistrationForm from './register';
import '../App.css';

// import { Card, CardContent, Typography } from '@material-ui/core';

const Home = () => {
    return (
        <><div class='home'>
            <h1>Welcome to the Hack A Fest!</h1>
            <p>Join us for an exciting event full of coding, collaboration, and creativity.</p>
            <button
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px'
                }}
                onClick={() => window.location.href = '/register'}
            >
                Register Now
            </button>


            <div class="timeline">
                <h2>Event Schedule</h2>
                <div class='timeli'>
                    <div class='time'>
                        <strong>10:00 AM - Opening Ceremony</strong>
                        <p>Kick off the event with a welcome speech and introduction.</p>
                    </div>
                    <div class='time'>
                        <strong>11:00 AM - Keynote Speaker</strong>
                        <p>Hear from an industry expert about the latest trends in technology.</p>
                    </div>
                    <div class='time'>
                        <strong>1:00 PM - Lunch Break</strong>
                        <p>Enjoy a variety of food options and network with other participants.</p>
                    </div>
                    <div class='time'>
                        <strong>2:00 PM - Coding Workshops</strong>
                        <p>Participate in hands-on workshops to learn new skills and techniques.</p>
                    </div>
                    <div class='time'>
                        <strong>5:00 PM - Hackathon Begins</strong>
                        <p>Form teams and start working on your projects.</p>
                    </div>
                    <div class='time'>
                        <strong>8:00 PM - Dinner Break</strong>
                        <p>Take a break and enjoy a delicious dinner.</p>
                    </div>                            <div class='time'>
                        <strong>9:00 PM - Continue Hacking</strong>
                        <p>Work through the night to complete your projects.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="timeline-container">
                <h2>Event Schedule</h2>
                <div className="rotating-disc">
                    <div className="disc-content">
                        <div className="time-item" style={{ "--rotation": "0deg" }}>
                            <strong>10:00 AM - Opening Ceremony</strong>
                            <p>Kick off the event with a welcome speech and introduction.</p>
                        </div>
                        <div className="time-item" style={{ "--rotation": "51.43deg" }}>
                            <strong>11:00 AM - Keynote Speaker</strong>
                            <p>Hear from an industry expert about the latest trends in technology.</p>
                        </div>
                        <div className="time-item" style={{ "--rotation": "102.86deg" }}>
                            <strong>1:00 PM - Lunch Break</strong>
                            <p>Enjoy a variety of food options and network with other participants.</p>
                        </div>
                        <div className="time-item" style={{ "--rotation": "154.29deg" }}>
                            <strong>2:00 PM - Coding Workshops</strong>
                            <p>Participate in hands-on workshops to learn new skills and techniques.</p>
                        </div>
                        <div className="time-item" style={{ "--rotation": "205.72deg" }}>
                            <strong>5:00 PM - Hackathon Begins</strong>
                            <p>Form teams and start working on your projects.</p>
                        </div>
                        <div className="time-item" style={{ "--rotation": "257.15deg" }}>
                            <strong>8:00 PM - Dinner Break</strong>
                            <p>Take a break and enjoy a delicious dinner.</p>
                        </div>
                        <div className="time-item" style={{ "--rotation": "308.58deg" }}>
                            <strong>9:00 PM - Continue Hacking</strong>
                            <p>Work through the night to complete your projects.</p>
                        </div>
                    </div>
                </div>
            </div></>

    );
};

export default Home;