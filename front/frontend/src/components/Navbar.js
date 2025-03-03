import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* <div className="navbar-logo">
                <img src={logo.png} alt="logo"/> 
            </div> */}
            <ul className="navbar-links">
                <li><Link to="/" >Home</Link></li>
                <li><Link to="/challenges">problem statement</Link></li>
                <li><Link to="/scoreboard">winners</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <li><Link to="/impact">Impact</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login-page">&nbsp;Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;