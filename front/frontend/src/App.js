import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';

import Leaderboard from './components/Leaderboard';
import Scoreboard from './components/scoreboard';
import Dashboard from './components/dash';
import Home from './components/home';
import Challenges from './components/challenges';
import RegistrationForm from './components/register1';
import Login from './components/login';
import Gallery from './components/gallery';
import Submissions from './components/submissions';
import Footer from './components/footer';
import Lay from './components/lay';
import Mentor from './components/registerm';
import DisplayChallenge from './components/displaychallenge';
import ContactUS from './components/contactus';
import Teammanager from './components/teammanager';
import MentorDashboard from './components/mentordash'

import Dashboard1 from './components/udashboard';
import ParticipantDashboard from './components/userdash';
import Demodash from './components/Demodash';
import EvaluationPortal from './components/evaluationportal';

import Events from './components/events';
import Eventlist from './components/eventsorganiser';
import Community from './components/community';

//Import JWT helper
import { getAuthToken, isAuthenticated } from './utils/auth'; // Helper for token
import { ImportIcon } from 'lucide-react';

import Organiserdash from './components/organiserdash';


//Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/challenges" element={<Challenges />} />

          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />

          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/submissions" element={<ProtectedRoute element={<Submissions />} />} /> */}
          <Route path="/submissions" element={<Submissions />} />

          <Route path="/lay" element={<Lay />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/displaychallenge/:track_id" element={<DisplayChallenge />} />

        
          {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dash1" element={<Dashboard1/>}/>
          <Route path="/dash2" element={<ParticipantDashboard />} />

          <Route path="/demodash" element={<Demodash/>}/>

          <Route path="/evaluation/:team_id" element={<EvaluationPortal/>}/>
          <Route path='/mentordash' element={<MentorDashboard />}/>


          <Route path="/contact" element={<ContactUS />} />
          <Route path="/teams" element={<Teammanager />} />
          <Route path="/organiserdash" element={<Organiserdash />} />

          <Route path="/events" element={<Events />} />
          <Route path='/eventlist' element={<Eventlist/>}/>
          <Route path='/community' element={<Community/>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

// import { useState,useEffect } from 'react';
// import './App.css';
// import Navbar from './components/Navbar';
// import Leaderboard from './components/Leaderboard';
// import Scoreboard from './components/scoreboard';
// import Dashboard from './components/dash';
// import Home from './components/home';

// function App() {
//   const [LeaderboardData, setLeaderboardData] = useState([]);
//   const [sortedLeaderboardData, setSortedLeaderboardData] =useState([]);
//   const [toppers, setToppers] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {  
//       // setLoading(true); 
//       setError(null); 

//       try {
//         const response = await fetch('http://localhost:5000/');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setLeaderboardData(data);
//         sortLeaderboard(data);
//       } catch (err) {
//         console.error('Error fetching leaderboard data:', err);
//         setError(err.message); 
//         // setLoading(false); 
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (sortedLeaderboardData.length > 0) {
//       setToppers(sortedLeaderboardData.slice(0, 3));
//     }
//   }, [sortedLeaderboardData]);

//   const sortLeaderboard = (data) => {
//     const sortedData = [...data].sort((a, b) => b.score - a.score);
//     setSortedLeaderboardData(sortedData);
//   };


//   if (error) {
//     return <div>Error: {error}</div>; 
//   }

//   return (
//     <div className="App">
//       <Home/>
//     </div>
//   );
// }

// export default App;
