import React from 'react';
import { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const Submissions = () => {
    const [submissions,setSubmissions] = useState([]);

    useEffect(() => {

    })
    return (
        <div className="container mt-5">
            <h3>Project Title</h3>
            <Form.Control type="text" placeholder='title' />
            <br />
            <h3>Github link</h3>
            <Form.Control type="text" placeholder='github.com/username'/>
            <br />
            <h3>Built with?(Description)</h3>
            <Form.Group className="mb-3">
            <Form.Control as="textarea" rows={3} placeholder='describe your project what it does and how it helps or anything you would like us to know' />
            </Form.Group>

            <h3>Select Problem Statement</h3>
            <Form.Select>
                <option>select problem statement</option>
                <option value='1'>ps 1</option>
                <option value='2'>ps 2</option>
                <option value='3'>ps 3</option>
                <option value='4'>ps 4</option>
            </Form.Select>
            <h3>PPT /Link Upload</h3>
            <Form.Control type="text" placeholder='drive link here ps:change permissions to editor'/>
            <br />
            <h3>Report Upload</h3>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" />
            </Form.Group>

            <h3>Document link</h3>
            <Form.Control type="text" placeholder='drive link here ps:change permissions to editor'/>
            <br />
            <h3>Video Link</h3>
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