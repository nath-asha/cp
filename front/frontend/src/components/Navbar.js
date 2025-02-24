import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 
import Home from './home';

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* <div className="navbar-logo">
                <Link to="/">MyApp</Link>
            </div> */}
            <ul className="navbar-links">
                <li><Link to="/" >Home</Link></li>
                <li><Link to="/about">problem statement</Link></li>
                <li><Link to="/services">winners</Link></li>
                {/* <li><Link to="/contact">Register</Link></li> */}
                <li><Link to="/">Gallery</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <li><Link to="/services">Impact</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;