import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CountUp from 'react-countup';
import { Carousel, Badge } from 'react-bootstrap';
import { User, Users, Calendar, Group } from 'lucide-react';
import './homemodified.css';

const HackaFestHome = () => {
  const [stats, setStats] = useState({ participants: 0, problems: 0, submissions: 0 });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stats")
      .then(res => setStats(res.data))
      .catch(console.error);

    axios.get("http://localhost:5000/events")
      .then(res => setEvents(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="hackafest-home">

      {/* Hero Section */}
      {/* <section className="hero-section">
        <div className="container text-center text-white">
          <h1 className="hero-title">HackaFest</h1>
          <p className="hero-subtitle">Ignite Innovation. Build the Future.</p>
          <Link to="/events" className="btn btn-outline-light mt-3">Explore Events</Link>
        </div>
      </section> */}
    <section className="hero-section"><div className="floating-code">
  <span>{`<div>`}</span>
  <span>{`console.log("HackaFest");`}</span>
  <span>{`function hack() {}`}</span>
  <span>{`<h1>Hack the Future</h1>`}</span>
  <span>{`{ code && chill }`}</span>
  <span>{`useEffect(() => {}, []);`}</span>
</div>
{/* 
  <div className="waves-bg">
    <div className="wave wave1"></div>
    <div className="wave wave2"></div>
    <div className="wave wave3"></div>
  </div> */}
  <div className="container hero-content text-center text-light position-relative z-1">
    <h1 className="hero-title">HackaFest</h1>
    <p className="hero-subtitle">Ignite Innovation. Build the Future.</p>
    <Link to="/events" className="btn btn-outline-light mt-3">Explore Events</Link>
  </div>
</section>



      {/* Stats */}
      <section className="stats-section py-5">
        <div className="container text-center">
          <h2 className="text-black mb-4">Platform Stats</h2>
          <div className="row">
            {[
              { label: 'Participants', value: stats.participants },
              { label: 'Problems', value: stats.problems },
              { label: 'Projects', value: stats.submissions }
            ].map((item, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="stat-card">
                  <h3><CountUp end={item.value} duration={3} />+</h3>
                  <p>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-5 text-black">How It Works</h2>
          <div className="row">
            {[
              { step: 'Register', text: 'Sign up and set up your profile' },
              { step: 'Find an Event', text: 'Pick a hackathon that suits you' },
              { step: 'Join a Team', text: 'Collaborate or find team members' },
              { step: 'Hack!', text: 'Build, compete, and innovate' }
            ].map((item, idx) => (
              <div className="col-md-3 mb-4" key={idx}>
                <div className="how-step">
                  <span className="step-badge">{idx + 1}</span>
                  <h5 className="mt-3">{item.step}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="events-section py-5">
        <div className="container text-center">
          <h2 className="mb-4  text-black">Upcoming Events</h2>
          <Carousel indicators={false} interval={3500} className="event-carousel">
            {events.map((event, idx) => (
              <Carousel.Item key={idx}>
                <div className="event-card mx-auto">
                  <img src={event.imgUrl} alt={event.title} className="event-img" />
                  <h5 className="mt-2">{event.title}</h5>
                  <a href={`/displayevent/${event.eventId}`}>
                    <Badge pill bg="primary">Know More</Badge>
                  </a>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Features */}
      <section className="features-section py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4 text-black">Features</h2>
          <div className="row">
            {[
              { icon: <User />, title: 'Easy Registration', desc: 'Quick sign-up & onboarding' },
              { icon: <Users />, title: 'Team Building', desc: 'Find or form your squad' },
              { icon: <Calendar />, title: 'Event Listings', desc: 'Discover great hackathons' },
              { icon: <Group />, title: 'Real-time Chat', desc: 'Stay synced with your team' }
            ].map((item, i) => (
              <div className="col-md-3 mb-4" key={i}>
                <div className="feature-card">
                  <div className="icon mb-2">{item.icon}</div>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-5 text-white">
        <div className="container text-center">
          <h3>Ready to Hack?</h3>
          <p>Sign up now and dive into the innovation space</p>
          <Link to="/register" className="btn btn-light mt-3">Get Started</Link>
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