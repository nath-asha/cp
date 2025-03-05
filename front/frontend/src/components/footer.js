import React from "react";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Footer = () => {
    return (
        <footer>
            {/* <p>Made with ❤️ by Creative Minds</p> */}
            <p>Follow us on 
                {/* <a href="https://twitter.com" style={{ color: '#1DA1F2', marginLeft: '5px' }}>Twitter</a>,  */}
                <a href="https://www.instagram.com/technical_career_education/">
                    <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '24px', color: 'white', marginLeft: '10px' }} />
                </a> 
                <a href="https://www.linkedin.com/company/technical-career-education/posts/?feedView=all">
                    <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '24px', color: 'white', marginLeft: '10px' }} />
                </a>
            </p>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            <p>This site uses cookies to enhance your experience. 🍪</p>
        </footer>
    );
};

export default Footer;