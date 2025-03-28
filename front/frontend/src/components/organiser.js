import React, { useState } from 'react';
import { Table, Nav, NavItem, NavLink, Card, Button } from 'react-bootstrap';
import { Trophy, Users, Calendar, PlusCircle } from 'lucide-react';

const EventOrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  
  const [events, setEvents] = useState([
    { id: 1, name: 'Reactathon 2024', participants: 250, date: '15-16 Aug 2024', status: 'Ongoing', registrationStatus: 'Open' },
    { id: 2, name: 'Frontend Masters Hackathon', participants: 180, date: '22-23 Sep 2024', status: 'Upcoming', registrationStatus: 'Soon' }
  ]);

  const [registrations, setRegistrations] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', event: 'Reactathon 2024', status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', event: 'Frontend Masters Hackathon', status: 'Pending' }
  ]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Event Organizer Dashboard</h1>
      
      <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
        <NavItem>
          <NavLink eventKey="events">Events</NavLink>
        </NavItem>
        <NavItem>
          <NavLink eventKey="registrations">Registrations</NavLink>
        </NavItem>
        <NavItem>
          <NavLink eventKey="analytics">Analytics</NavLink>
        </NavItem>
      </Nav>

      <div className="mt-3">
        {activeTab === 'events' && (
          <Card className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Upcoming Events</h5>
              <Button variant="outline-primary" size="sm">
                <PlusCircle size={16} className="me-2" /> Add New Event
              </Button>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Participants</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Registration</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id}>
                    <td>{event.name}</td>
                    <td><Users size={16} className="me-2" /> {event.participants}</td>
                    <td><Calendar size={16} className="me-2" /> {event.date}</td>
                    <td><span className={`badge ${event.status === 'Ongoing' ? 'bg-success' : 'bg-primary'}`}>{event.status}</span></td>
                    <td><span className={`badge ${event.registrationStatus === 'Open' ? 'bg-success' : 'bg-secondary'}`}>{event.registrationStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
        
        {activeTab === 'registrations' && (
          <Card className="p-3">
            <h5>Participant Registrations</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map(reg => (
                  <tr key={reg.id}>
                    <td>{reg.name}</td>
                    <td>{reg.email}</td>
                    <td>{reg.event}</td>
                    <td><span className={`badge ${reg.status === 'Confirmed' ? 'bg-success' : 'bg-warning'}`}>{reg.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <div className="row g-3">
            <div className="col-md-4">
              <Card className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6>Total Events</h6>
                  <Trophy size={16} />
                </div>
                <h4>{events.length}</h4>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6>Total Participants</h6>
                  <Users size={16} />
                </div>
                <h4>{events.reduce((total, event) => total + event.participants, 0)}</h4>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6>Upcoming Events</h6>
                  <Calendar size={16} />
                </div>
                <h4>{events.filter(event => event.status === 'Upcoming').length}</h4>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventOrganizerDashboard;
