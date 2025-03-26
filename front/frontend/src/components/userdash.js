import React, { useState } from 'react';
import { Clock, Calendar, Award, Users, Code, Coffee, Bell } from 'lucide-react';

const ParticipantDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New workshop: Advanced React Hooks at 2PM", read: false },
    { id: 2, message: "Your team submission is due in 3 hours", read: false },
    { id: 3, message: "Lunch is now being served in the main hall", read: true }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(note => ({ ...note, read: true })));
  };

  const events = [
    { time: "9:00 AM", title: "Opening Ceremony", location: "Main Stage" },
    { time: "10:30 AM", title: "Team Formation", location: "Collaboration Hall" },
    { time: "12:00 PM", title: "Lunch Break", location: "Dining Area" },
    { time: "1:30 PM", title: "Workshop: React Performance", location: "Room 101" },
    { time: "3:00 PM", title: "Mentor Sessions", location: "Hacking Zone" },
    { time: "6:00 PM", title: "Dinner", location: "Dining Area" },
    { time: "8:00 PM", title: "Evening Coding Sprint", location: "Hacking Zone" }
  ];

  const teamMembers = [
    { name: "Alex Chen", role: "Frontend Developer", avatar: "/api/placeholder/50/50" },
    { name: "Jamie Smith", role: "UI/UX Designer", avatar: "/api/placeholder/50/50" },
    { name: "Taylor Wong", role: "Backend Developer", avatar: "/api/placeholder/50/50" },
    { name: "Jordan Lee", role: "DevOps", avatar: "/api/placeholder/50/50" }
  ];

  const resources = [
    { title: "API Documentation", link: "#" },
    { title: "Component Library", link: "#" },
    { title: "React Best Practices", link: "#" },
    { title: "Dataset Access", link: "#" }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'schedule':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Today's Schedule</h3>
            <div className="space-y-3">
              {events.map((event, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded flex items-start">
                  <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mr-3">
                    {event.time}
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'team':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Team Members</h3>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded flex items-center">
                  <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'resources':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Helpful Resources</h3>
            <div className="grid grid-cols-2 gap-3">
              {resources.map((resource, index) => (
                <a 
                  key={index} 
                  href={resource.link} 
                  className="bg-gray-100 p-3 rounded text-center hover:bg-gray-200 transition-colors"
                >
                  <h4 className="font-medium">{resource.title}</h4>
                </a>
              ))}
            </div>
            <div className="bg-blue-100 p-3 rounded mt-4">
              <h4 className="font-medium">Need Help?</h4>
              <p className="text-sm">Mentors are available at the Help Desk or on #help-reactathon</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-100 p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Time Remaining</h3>
                  <p className="text-2xl font-bold">18:45:22</p>
                </div>
                <Clock className="text-indigo-500 w-10 h-10" />
              </div>
              
              <div className="bg-emerald-100 p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Your Team</h3>
                  <p className="text-2xl font-bold">Team Reactors</p>
                </div>
                <Users className="text-emerald-500 w-10 h-10" />
              </div>
            </div>
            
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-semibold flex items-center">
                <Calendar className="mr-1 w-5 h-5" /> Next Event
              </h3>
              <div className="mt-2">
                <p className="text-lg font-bold">Workshop: React Performance</p>
                <p>1:30 PM • Room 101</p>
              </div>
            </div>
            
            <div className="bg-purple-100 p-4 rounded">
              <h3 className="font-semibold flex items-center">
                <Code className="mr-1 w-5 h-5" /> Challenge Progress
              </h3>
              <div className="mt-2">
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="mt-1 text-right text-sm">65% Complete</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
    
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">React-a-thon 2025</h1>
            <p>Welcome, Participant!</p>
          </div>
          <div className="relative">
            <Bell 
              className="w-6 h-6 cursor-pointer" 
              onClick={() => setActiveTab(activeTab === 'notifications' ? 'overview' : 'notifications')} 
            />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </div>
        </div>
      </div>
      

      {activeTab === 'notifications' && (
        <div className="bg-white border border-gray-200 rounded-b shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold">Notifications</h2>
            <button 
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
          </div>
          <div className="space-y-2">
            {notifications.length > 0 ? notifications.map(note => (
              <div key={note.id} className={`p-3 rounded ${note.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                {note.message}
              </div>
            )) : (
              <p className="text-gray-500 text-center py-2">No notifications</p>
            )}
          </div>
        </div>
      )}

      {activeTab !== 'notifications' && (
        <div className="bg-white border border-gray-200 rounded-b shadow">

          <div className="flex border-b">
            <button 
              className={`px-4 py-3 font-medium flex items-center ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              <Award className="w-4 h-4 mr-1" /> Overview
            </button>
            <button 
              className={`px-4 py-3 font-medium flex items-center ${activeTab === 'schedule' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => setActiveTab('schedule')}
            >
              <Calendar className="w-4 h-4 mr-1" /> Schedule
            </button>
            <button 
              className={`px-4 py-3 font-medium flex items-center ${activeTab === 'team' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => setActiveTab('team')}
            >
              <Users className="w-4 h-4 mr-1" /> Team
            </button>
            <button 
              className={`px-4 py-3 font-medium flex items-center ${activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              onClick={() => setActiveTab('resources')}
            >
              <Coffee className="w-4 h-4 mr-1" /> Resources
            </button>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantDashboard;