import React from 'react';
import { useAuth } from '../provider/AuthProvider';
import Dashboard from './Demodash';
import MentorDashboard from './mentordash';
import Organiserdash from './organiserdash';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user || !user.role) {
        return <p>Unauthorized access.</p>;
    }

    switch (user.role) {
        case 'user':
            return <Dashboard />;
        case 'Mentor':
            return <MentorDashboard />;
        case 'organiser':
            return <Organiserdash />;
        default:
            return <p>Invalid role.</p>;
    }
};

export default Dashboard;