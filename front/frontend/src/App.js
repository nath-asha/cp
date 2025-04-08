import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';


import { AuthProvider } from './provider/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized'; 
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
import MentorDashboard from './components/mentordash';
// import MentorDashboard from './components/About';
// import MentorDashboardo from '../';

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

import Logino from './components/loogin';
import About from './components/About';
import Profile from './components/Profile';

import Displayevent from './components/topper';

import EventOrganizerDashboard from './components/organiser';
import MentorDashboardin from './components/mentos';
import HackaFestHome from './components/homemodified';
//Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
    const onCallback = () => {
        console.log("awesome");
    };
  return (
    <Router>
          <AuthProvider>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<HackaFestHome />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/challenges" element={<Challenges />} />

          <Route path="/challenges/:eventId" element={<Challenges />} />


          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login1" element={<Login />} />

          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/submissions" element={<ProtectedRoute element={<Submissions />} />} /> */}
          <Route path="/submissions" element={<PrivateRoute allowedRoles={['user']}>
          <Submissions />
            </PrivateRoute> } />

          <Route path="/lay" element={<Lay />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/displaychallenge/:trackId" element={<DisplayChallenge />} />
          <Route path="/displaychallenge/:eventId" element={<DisplayChallenge />} />

        
          {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> */}
          <Route path="/dashboard" element={
            <PrivateRoute allowedRoles={['user', 'organizer']}>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/dash1" element={<PrivateRoute allowedRoles={['user', 'organizer']}>
           <ParticipantDashboard /></PrivateRoute>} />
           <Route path="/dash2" element={<PrivateRoute allowedRoles={['user', 'organizer']}>
           <Dashboard1 /></PrivateRoute>} />

          <Route path="/demodash" element={<PrivateRoute allowedRoles={['user', 'organizer']}>
          <Demodash/>
            </PrivateRoute> }/>

          <Route path="/evaluation/:teamId" element={<PrivateRoute allowedRoles={['admin', 'organizer','mentor','judge']}>
          <EvaluationPortal/>
            </PrivateRoute> }/>
          {/* <Route path='/mentordash' element={<MentorDashboard />}/> */}


          <Route path="/contact" element={<ContactUS />} />
          <Route path="/teams" element={<PrivateRoute allowedRoles={['user', 'organizer']}>
          <Teammanager />            </PrivateRoute>} />
          <Route path="/organiserdash" element={ <PrivateRoute allowedRoles={['admin', 'organizer']}>
              <Organiserdash />
            </PrivateRoute> } />

          <Route path="/events" element={<Events />} />
          <Route path='/eventlist' element={<PrivateRoute allowedRoles={['admin', 'organizer']}> <Eventlist/> </PrivateRoute>}/>
          <Route path='/community' element={<PrivateRoute allowedRoles={['admin','mentor','user', 'organizer']}><Community/></PrivateRoute>} />
          <Route path='/logino' element={<Logino/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/profile' element={<PrivateRoute allowedRoles={['admin','mentor','user','judge', 'organizer']}><Profile/></PrivateRoute>}/>

          <Route path='/displayevent/:eventId' element={<Displayevent/>}/>

          {/* <Route path='/mento' element={<MentorDashboardo/>}/> */}
          <Route path='/organo' element={< EventOrganizerDashboard/>} />
          <Route path='/mentos' element={< MentorDashboardin/>} />
          <Route path='/homepage' element={<Home/>}/>
          <Route
          path="/mentordash"
          element={
            <PrivateRoute allowedRoles={['Mentor']}>
              <MentorDashboard />
            </PrivateRoute>
          }
        />
      {/* <PrivateRoute path="/viewer" component={ViewerPage} allowedRoles={['admin', 'editor', 'viewer']} /> */}
      <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
        <Footer />
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Leaderboard from './components/Leaderboard';
// import Scoreboard from './components/scoreboard';
// import Dashboard from './components/dash';
// import Home from './components/home';
// import Challenges from './components/challenges';
// import RegistrationForm from './components/register1';
// import Login from './components/login';
// import Gallery from './components/gallery';
// import Submissions from './components/submissions';
// import Footer from './components/footer';
// import Lay from './components/lay';
// import Mentor from './components/registerm';
// import DisplayChallenge from './components/displaychallenge';
// import ContactUS from './components/contactus';
// import Teammanager from './components/teammanager';
// import MentorDashboard from './components/mentordash';
// import Dashboard1 from './components/udashboard';
// import ParticipantDashboard from './components/userdash';
// import Demodash from './components/Demodash';
// import EvaluationPortal from './components/evaluationportal';
// import Events from './components/events';
// import Eventlist from './components/eventsorganiser';
// import Community from './components/community';
// import { isAuthenticated } from './utils/auth';
// import Organiserdash from './components/organiserdash';
// import './App.css'; // Import the CSS file

// //Protected Route Component
// const ProtectedRoute = ({ element }) => {
//   return isAuthenticated() ? element : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="App-container"> {/* Apply the CSS class here */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/leaderboard" element={<Leaderboard />} />
//           <Route path="/scoreboard" element={<Scoreboard />} />
//           <Route path="/challenges" element={<Challenges />} />
//           <Route path="/register" element={<RegistrationForm />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/submissions" element={<Submissions />} />
//           <Route path="/lay" element={<Lay />} />
//           <Route path="/mentor" element={<Mentor />} />
//           <Route path="/displaychallenge/:trackId" element={<DisplayChallenge />} />
//           <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
//           <Route path="/dash1" element={<Dashboard1 />} />
//           <Route path="/dash2" element={<ParticipantDashboard />} />
//           <Route path="/demodash" element={<Demodash />} />
//           <Route path="/evaluation/:team_id" element={<EvaluationPortal />} />
//           <Route path="/mentordash" element={<MentorDashboard />} />
//           <Route path="/contact" element={<ContactUS />} />
//           <Route path="/teams" element={<Teammanager />} />
//           <Route path="/organiserdash" element={<Organiserdash />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/eventlist" element={<Eventlist />} />
//           <Route path="/community" element={<Community />} />
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;