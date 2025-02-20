import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* <div className="navbar-logo">
                <Link to="/">MyApp</Link>
            </div> */}
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">problem statement</Link></li>
                <li><Link to="/services">winners</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">leaderboard</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;