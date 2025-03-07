import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';

const DisplayChallenge = ({ title, description, details }) => {
     const [challenges, setChallenges] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/challenges'); // Updated API route
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setChallenges(data);
            console.log(data);
          } catch (err) {
            console.error('Error fetching problem statement data:', err);
          }
        };
    
        fetchData();
      }, []);
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

    const handleNextChallenge = () => {
        setCurrentChallengeIndex((prevIndex) => (prevIndex + 1) % challenges.length);
    };

    return (
        <div className="container mt-5">
            {challenges.length > 0 && (
                <div className="card mb-3">
                    <div className="card-header">
                        <h1>{challenges[currentChallengeIndex].title}</h1>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{challenges[currentChallengeIndex].description}</p>
                        <div className="mt-4">
                            <h2>Details:</h2>
                            <p>Image URL: {challenges[currentChallengeIndex].imgurl}</p>
                            <p>Track ID: {challenges[currentChallengeIndex].trackid}</p>
                        </div>
                    </div>
                </div>
            )}
            <button className="btn btn-primary mt-3" onClick={handleNextChallenge}>
                Next Challenge
            </button>
        </div>
    );
};

export default DisplayChallenge;

// design a page to show the description title and details of challenges in a way of beautified layout in theme of treasure