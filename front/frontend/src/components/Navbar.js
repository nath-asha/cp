import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import '../styles/navbar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { User} from 'lucide-react';

const Navbar = () => {
    const { user, loading, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    if (loading) {
        return <nav className="navbar sticky-top">Loading...</nav>;
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar sticky-top">
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                {/* <li><Link to="/leaderboard">Leaderboard</Link></li> */}
                <li><Link to="/contact">Contact</Link></li>

                {user && user.email ? (
                    <li className="user-dropdown">
                        <User className='text-white' onClick={toggleDropdown} />
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                {user.role === 'user' && (
                                    <li><Link to="/demodash">Participant Dashboard</Link></li>
                                )}
                                {user.role === 'Mentor' && (
                                    <li><Link to="/mentordash">Mentor Dashboard</Link></li>
                                )}
                                {user.role === 'organiser' && (
                                    <li><Link to="/organiserdash">Organiser Dashboard</Link></li>
                                )}
                                <li>
                                    <Link
                                        to="/logino"
                                        onClick={() => {
                                            logout();
                                            navigate('/logino');
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                ) : (
                    <li><Link to="/logino">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

// import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { useAuth } from '../provider/AuthProvider';
// import '../styles/navbar.css';
// import { User } from 'lucide-react';

// const Navbar = () => {
//     const { user, loading } = useAuth(); 

//     if (loading) {
//         return <nav className="navbar sticky-top">Loading...</nav>; 
//     }

//     return (
//         <nav className="navbar sticky-top">
//             <ul className="navbar-links">
//                 <li><Link to="/">Home</Link></li>
//                <li><Link to="/events">Events</Link></li>
//                 <li><Link to="/gallery">Gallery</Link></li>
//                 <li><Link to="/leaderboard">Leaderboard</Link></li>
//                 <li><Link to="/contact">Contact</Link></li> 
//                 {/* <li><Link to="/login1">Login</Link></li> */}
//                  {(!user || !user.username) && <li><Link to="/logino">Login</Link></li>}
//                 {/* <li><Link to="/logino">Login</Link></li> */}
//                 <li><Link to="/dashboard"><User /></Link></li>
//                 {user && user.username && <Link to="/profile"><User /></Link>}
//                 {/* {(!user || !user.username) && <Link to="/logino">Login</Link>} */}

//             </ul>
//         </nav>
//     );
// };

// export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/navbar.css'; 

// const Navbar = () => {
//     return (
//         <nav className="navbar">
//             {/* <div className="navbar-logo">
//                 <img src={logo.png} alt="logo"/> 
//             </div> */}
//             <ul className="navbar-links">
//                 {/* <a class="navbar-brand" href="#">
//                     <img src='download.png' alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
//                 </a> */}
//                 <li><Link to="/" >Home</Link></li>
//                 <li><Link to="/challenges">problem statement</Link></li>
//                 <li><Link to="/scoreboard">winners</Link></li>
//                 <li><Link to="/dashboard">Dashboard</Link></li>
//                 <li><Link to="/gallery">Gallery</Link></li>
//                 <li><Link to="/leaderboard">Leaderboard</Link></li>
//                 <li><Link to="/api/submissions">Impact</Link></li>
//                 <li><Link to="/contact">Contact</Link></li>
//                 <li><Link to="/login">&nbsp;Login</Link></li>
//                 {/* <li><Link to="/lay">Lay</Link></li> */}
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;