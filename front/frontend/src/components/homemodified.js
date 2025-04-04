import React, { useRef } from 'react';
import '../App.css';
import './homemodified.css';
import { Link } from 'react-router-dom';
import Timeline from 'react-timeline-animation'; // Import Timeline

const HackaFestHome = () => {
    const timelineRef = useRef(null);

    const animation = [
        {
            target: timelineRef,
            duration: 1,
            keyframes: {
                opacity: [0, 1],
                transform: ['translateY(-20px)', 'translateY(0px)'],
            },
            easing: 'easeOutQuad',
        },
        {
            target: timelineRef,
            duration: 0.5,
            keyframes: {
                backgroundColor: ['#f8f9fa', '#e9ecef'],
            },
        },
    ];

    return (
        <div className="hackafest-home">
            <section className="hero">
                <div className="hero-content">
                    <h1>HackaFest: Your Digital Hackathon Hub</h1>
                    <p>Effortlessly register, form teams, and join exciting hackathons from anywhere.</p>
                    <div className="hero-buttons">
                        <Link to="/register" className="hero-button register">Register Now</Link>
                        <Link to="/events" className="hero-button events">Explore Events</Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>Key Features</h2>
                    <div className="feature-grid">
                        <div className="feature-item">
                            <i className="fas fa-user-plus"></i>
                            <h3>Easy Registration</h3>
                            <p>Quickly sign up and join hackathons with a few clicks.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-users"></i>
                            <h3>Team Formation</h3>
                            <p>Find teammates or create your own team with our intuitive tools.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-calendar-alt"></i>
                            <h3>Event Listings</h3>
                            <p>Browse a wide range of hackathons and find the perfect fit for your skills.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-comments"></i>
                            <h3>Real-time Communication</h3>
                            <p>Stay connected with your team and organizers through integrated chat.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={timelineRef} className="how-it-works">
                <div className="container">
                    <h2>How It Works</h2>
                    <div className="steps">
                        <div className="step">
                            <span className="step-number">1</span>
                            <h3>Register</h3>
                            <p>Create your HackaFest account and complete your profile.</p>
                        </div>
                        <div className="step">
                            <span className="step-number">2</span>
                            <h3>Find an Event</h3>
                            <p>Explore upcoming hackathons and choose the one that excites you.</p>
                        </div>
                        <div className="step">
                            <span className="step-number">3</span>
                            <h3>Join a Team</h3>
                            <p>Form a team or join an existing one to collaborate on your project.</p>
                        </div>
                        <div className="step">
                            <span className="step-number">4</span>
                            <h3>Hack!</h3>
                            <p>Participate in the hackathon, create amazing projects, and have fun.</p>
                        </div>
                    </div>
                </div>
                <Timeline animation={animation} repeat={0} />
            </section>

            <section className="call-to-action">
                <div className="container">
                    <h2>Ready to Join a Hackathon?</h2>
                    <p>Start your journey with HackaFest and unleash your creativity.</p>
                    <Link to="/register" className="cta-button">Get Started</Link>
                </div>
            </section>
        </div>
    );
};

export default HackaFestHome;
// import React from 'react';
// import '../App.css';
// import './homemodified.css'; // Import homepage-specific styles
// import Timer from './CountDown'; // Assuming you have a countdown timer component
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// const HomePage = () => {
//     return (
//         <div className="homepage">
//             <header className="hero">
//                 <div className="hero-content">
//                     <h1>Unleash Your Innovation at Hackafest!</h1>
//                     <p>Join us for a weekend of coding, collaboration, and groundbreaking ideas.</p>
//                     <Link to="/register" className="register-button">Register Now</Link>
//                 </div>
//             </header>

//             <section className="countdown-section">
//                 <h2>Hackathon Starts In:</h2>
//                 <Timer /> {/* Display your countdown timer */}
//             </section>

//             <section className="about-section">
//                 <h2>About [Hackathon Name]</h2>
//                 <p>
//                     Reacta is a 2-day hackathon where developers, designers, and innovators come together to build amazing projects. Whether you're a seasoned coder or just starting out, you'll find a welcoming community and exciting challenges.
//                 </p>
//                 <div className="highlights">
//                     <div className="highlight-item">
//                         <h3>Prizes & Rewards</h3>
//                         <p>Win exciting prizes and gain recognition for your hard work.</p>
//                     </div>
//                     <div className="highlight-item">
//                         <h3>Workshops & Mentors</h3>
//                         <p>Learn from industry experts and get guidance from experienced mentors.</p>
//                     </div>
//                     <div className="highlight-item">
//                         <h3>Networking</h3>
//                         <p>Connect with fellow hackers, potential employers, and industry leaders.</p>
//                     </div>
//                 </div>
//             </section>

//             <section className="schedule-section">
//                 <h2>Event Schedule</h2>
//                 <div className="schedule-items">
//                     <div className="schedule-item">
//                         <strong>Day 1:</strong>
//                         <p>Opening Ceremony, Team Formation, Idea Pitches</p>
//                     </div>
//                     <div className="schedule-item">
//                         <strong>Day 2:</strong>
//                         <p>Coding Workshops, Project Development, Mentor Sessions</p>
//                     </div>
//                     <div className="schedule-item">
//                         <strong>Day 3:</strong>
//                         <p>Final Project Submission, Demos, Judging, Awards Ceremony</p>
//                     </div>
//                 </div>
//             </section>

//             <section className="venue-section">
//                 <h2>Venue</h2>
//                 <p>
//                     [Venue Name], [Venue Address]
//                 </p>
//                 {/* Add a map or image of the venue here */}
//             </section>

//             <section className="faq-section">
//                 <h2>Frequently Asked Questions</h2>
//                 <div className="faq-items">
//                     <div className="faq-item">
//                         <h3>What should I bring?</h3>
//                         <p>Your laptop, charger, and a passion for creating!</p>
//                     </div>
//                     <div className="faq-item">
//                         <h3>Can I participate if I'm a beginner?</h3>
//                         <p>Absolutely! We welcome participants of all skill levels.</p>
//                     </div>
//                     {/* Add more FAQs */}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default HomePage;