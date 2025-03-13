import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar sticky-top">
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/challenges">Problem Statement</Link></li>
                {/* <li><Link to="/scoreboard">Winners</Link></li> */}
                {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                {/* <li><Link to="/submissions">Impact</Link></li> */}
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Login</Link></li>
                {/* <li><Link to="/demodash">demo</Link></li> */}
            </ul>
        </nav>
    );
};

export default Navbar;

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
//                     <img src='download.png' alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />
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