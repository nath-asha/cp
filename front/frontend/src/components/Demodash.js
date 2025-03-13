import { useState,useEffect} from 'react';
import React from "react";
import axios from 'axios';
import { Clock, Calendar, Award, Users, Code, Coffee, Bell } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Demodash() {
     const [data, setData] = useState({
            submissions: [],
            teamRequests: [],
            scores: [],
            leaderboard: [],
            profile: {},
            mentor: {}
        });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const fetchAllData = async () => {
          setLoading(true);
          try {
              const [dashboardData, teamData, submissionData] = await Promise.all([
                  axios.get('http://localhost:5000/api/dashboard-data'),
                  axios.get('http://localhost:5000/teams'),
                  axios.get('http://localhost:5000/api/submissions')
              ]);
              
              // Merge all the data
                setData({
                  ...dashboardData.data,
                  teams: teamData.data,
                  submissions: submissionData.data,
                  teamRequests: dashboardData.data.teamRequests,
                  profile: dashboardData.data.profile,
                  mentor: dashboardData.data.mentor
                });
          } catch (error) {
              console.error('Error fetching dashboard data', error);
          } finally {
              setLoading(false);
          }
      };

      fetchAllData();
  }, [data]);

    return(
    <div className='container-md '>
        <div className='Grid'>
            <div className='Row'>
                <div className='col'>
                    <h2 className='text-black'>Dashboard</h2>
                    
                </div>
            </div>
        </div>
    </div>
    )};

export default Demodash;