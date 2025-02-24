import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';


import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../App.css';

function Challenges() {

    const challenges = [
        { id: 1, title: 'Challenge 1', description: 'Description' , trackId: 'Track 1' },
        { id: 2, title: 'Challenge 2', description: 'Description ', trackId: 'Track 2' },
        { id: 3, title: 'Challenge 3', description: 'Description for challenge 3', trackId: 'Track 3' },
    ];
 
  const [Challenges, setChallenges] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {  
      try {
        const response = await fetch('http://localhost:5000/challenges'); // Updated API route
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setChallenges(data);
      } catch (err) {
        console.error('Error fetching problem statement data:', err);
      }
    };

    fetchData();
  }, []);

 



  return (
    <div>
    {challenges.map((challenge) => (
        <Card key={challenge.id} style={{ margin: '20px' }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {challenge.title}
                </Typography>
                <Typography color="textSecondary">
                    {challenge.description}
                </Typography>
                <Typography variant="body2" component="p">
                    Track ID: {challenge.trackId}
                </Typography>
            </CardContent>
        </Card>
    ))}
</div>
  );
}



export default Challenges;



