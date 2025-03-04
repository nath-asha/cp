import React from 'react';
import { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const Submissions = () => {
    const [submissions, setSubmissions] = useState({});
    // const [submitted, setSubmitted] = useState(false);
    // const [valid, setValid] = useState(false);
  
    useEffect(() => {

    })
    // const handleInputChange = (event) => {
    //     const { name, submissions } = event.target;
    //     setSubmissions((values) => ({
    //       ...submissions,
    //       [name]: setSubmissions
    //     }));
    //   };
    
     
    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (Object.submissions(submissions).every(submissions => submissions)) {
    //       setValid(true);
    //     }
    //     setSubmitted(true);
    //   };
    return (
        <div className="container md-5">
            <h4>Team Name</h4>
            <h4>Project Title</h4>
            <Form.Control type="text" placeholder='title' />
            <br />
            <h4>Github link</h4>
            <Form.Control type="text" placeholder='github.com/username'/>
            <br />
            <h4>Built with?(Description)</h4>
            <Form.Group className="mb-3">
            <Form.Control as="textarea" rows={3} placeholder='describe your project what it does and how it helps or anything you would like us to know' />
            </Form.Group>

            <h4>Select Problem Statement</h4>
            <Form.Select>
                <option>select problem statement</option>
                <option value='1'>ps 1</option>
                <option value='2'>ps 2</option>
                <option value='3'>ps 3</option>
                <option value='4'>ps 4</option>
            </Form.Select>
            <h4>PPT /Link Upload</h4>
            <Form.Control type="text" placeholder='drive link here ps:change permissions to editor'/>
            <br />
            <h4>Thumbnail link(OR Screenshot of the main page)</h4>
            <Form.Control type="text" placeholder='drive link here ps:change permissions to editor'/>
            <br />
            <h4>Report Upload</h4>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" />
            </Form.Group>

            <h4>Document link</h4>
            <Form.Control type="text" placeholder='drive link here ps:change permissions to editor'/>
            <br />
            <h4>Video Link</h4>
            <Form.Control type="text" placeholder='drive link here ps:change permissions to editor'/>
            <br />

            <button>Save and Continue</button>
            <br></br>
            <button>Cancel</button>
            
            {/* <h1 className="text-center mb-4" >Project Submissions</h1>
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
                    <button className="btn btn-primary mr-2">Add Participant</button>
                    <button className="btn btn-secondary">Manage Submission</button>
                </div>
            </div> */}
        </div>
    );
};

export default Submissions;