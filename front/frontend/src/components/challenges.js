import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const challenges = [
    { id: 1, title: 'Challenge 1', description: 'Description' , trackId: 'Track 1' },
    { id: 2, title: 'Challenge 2', description: 'Description ', trackId: 'Track 2' },
    { id: 3, title: 'Challenge 3', description: 'Description for challenge 3', trackId: 'Track 3' },
];

const Challenges = () => {
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
};

export default Challenges;