import React, { useState } from 'react';
import { Table, Button, ProgressBar, Card } from 'react-bootstrap';

const MentorDashboard = () => {
  const [mentees, setMentees] = useState([
    {
      id: 1,
      name: 'Alex Rodriguez',
      domain: 'Frontend Development',
      progress: 75,
      lastMeeting: '2 days ago',
      status: 'Active',
      avatar: 'https://via.placeholder.com/40'
    },
    {
      id: 2,
      name: 'Sarah Kim',
      domain: 'UI/UX Design',
      progress: 60,
      lastMeeting: '5 days ago',
      status: 'Needs Attention',
      avatar: 'https://via.placeholder.com/40'
    }
  ]);

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      mentee: 'Alex Rodriguez',
      date: '2024-08-15',
      time: '14:00',
      type: 'Technical Review',
      status: 'Scheduled'
    },
    {
      id: 2,
      mentee: 'Sarah Kim',
      date: '2024-08-20',
      time: '16:30',
      type: 'Career Guidance',
      status: 'Pending'
    }
  ]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Mentor Dashboard</h1>

      {/* Mentees Section */}
      <Card className="mb-4">
        <Card.Header>
          <h5>My Mentees</h5>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mentee</th>
                <th>Domain</th>
                <th>Progress</th>
                <th>Last Interaction</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mentees.map((mentee) => (
                <tr key={mentee.id}>
                  <td>
                    <img src={mentee.avatar} alt={mentee.name} className="rounded-circle me-2" width="40" />
                    {mentee.name}
                  </td>
                  <td>{mentee.domain}</td>
                  <td>
                    <ProgressBar now={mentee.progress} label={`${mentee.progress}%`} />
                  </td>
                  <td>{mentee.lastMeeting}</td>
                  <td>
                    <span className={`badge ${mentee.status === 'Active' ? 'bg-success' : 'bg-warning'}`}>{mentee.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Meetings Section */}
      <Card>
        <Card.Header>
          <h5>Upcoming Meetings</h5>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mentee</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr key={meeting.id}>
                  <td>{meeting.mentee}</td>
                  <td>{meeting.date}</td>
                  <td>{meeting.time}</td>
                  <td>{meeting.type}</td>
                  <td>
                    <span className={`badge ${meeting.status === 'Scheduled' ? 'bg-primary' : 'bg-secondary'}`}>{meeting.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MentorDashboard;
