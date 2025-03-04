import React from 'react';
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const Submissions = () => {
    const [submissions,setSubmissions] = useState([]);

    useEffect(() => {

    })
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" >Project Submissions</h1>
            <div className="card mb-3">
                <div className="card-header">
                    <h2>Project Title</h2>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Participants</h5>
                    <ul className="list-group mb-3">
                        <li className="list-group-item">Participant 1</li>
                        <li className="list-group-item">Participant 2</li>
                        <li className="list-group-item">Participant 3</li>
                    </ul>
                    <h5 className="card-title">Project Links</h5>
                    <ul className="list-group">
                        <li className="list-group-item"><a href="#git">GitHub Repository</a></li>
                        <li className="list-group-item"><a href="#vid">Video Presentation</a></li>
                        <li className="list-group-item"><a href="#ppt">PowerPoint Slides</a></li>
                        <li className="list-group-item"><a href="#doc">Documentation</a></li>
                    </ul>
                </div>
                <div className="card-footer text-right">
                    {/* <button className="btn btn-primary mr-2">Add Participant</button> */}
                    <button className="btn btn-secondary">Manage Submission</button>
                </div>
            </div>
        </div>
    );
};

export default Submissions;