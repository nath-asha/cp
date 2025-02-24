import React from 'react';
import RegistrationForm from './register';
const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
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
            
        </div>
    );
};

export default Home;