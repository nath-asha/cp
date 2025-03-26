import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Submissions = () => {
    const [submissions, setSubmissions] = useState({
        title: '',
        gitrepo: '',
        projectdesc: '',
        ps: '',
        ppt: '',
        thumbnail: '',
        doc: '',
        vid: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(true);
    const [loading, setLoading] = useState(false);

    // Handle Text Inputs
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSubmissions((prevSubmissions) => ({
            ...prevSubmissions,
            [name]: value,
        }));
    };

    // Handle File Selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Validate Required Fields
    const isFormValid = () => {
        return submissions.title && submissions.gitrepo && submissions.projectdesc && submissions.ps;
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        
        if (!isFormValid()) {
            setValid(false);
            return;
        }

        setValid(true);
        setLoading(true);

        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('preport', selectedFile);
            }

            Object.entries(submissions).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const response = await fetch('http://localhost:5000/api/submissions', {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();
            console.log('Response:', responseData);

            if (response.ok) {
                console.log('Submission successful');
            } else {
                console.error('Failed to submit');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setLoading(false);
    };

    return (
        <div>
            <h4>Team Name</h4>
            <h4>Project Title</h4>
            <Form.Control
                type="text"
                placeholder="Enter project title"
                name="title"
                onChange={handleInputChange}
                value={submissions.title}
            />
            <br />

            <h4>GitHub Repository</h4>
            <Form.Control
                type="text"
                placeholder="github.com/username"
                name="gitrepo"
                value={submissions.gitrepo}
                onChange={handleInputChange}
            />
            <br />

            <h4>Project Description</h4>
            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Describe your project, how it works, and its impact"
                    name="projectdesc"
                    value={submissions.projectdesc}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <h4>Select Problem Statement</h4>
            <Form.Select name="ps" value={submissions.ps} onChange={handleInputChange}>
                <option value="">Select problem statement</option>
                <option value="1">PS 1</option>
                <option value="2">PS 2</option>
                <option value="3">PS 3</option>
                <option value="4">PS 4</option>
            </Form.Select>
            <br />

            <h4>PPT / Link Upload</h4>
            <Form.Control
                type="text"
                placeholder="Drive link (ensure editor access)"
                name="ppt"
                value={submissions.ppt}
                onChange={handleInputChange}
            />
            <br />

            <h4>Thumbnail / Screenshot</h4>
            <Form.Control
                type="text"
                placeholder="Drive link (ensure editor access)"
                name="thumbnail"
                value={submissions.thumbnail}
                onChange={handleInputChange}
            />
            <br />

            <h4>Report Upload</h4>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
            </Form.Group>

            <h4>Document Link</h4>
            <Form.Control
                type="text"
                placeholder="Drive link (ensure editor access)"
                name="doc"
                value={submissions.doc}
                onChange={handleInputChange}
            />
            <br />

            <h4>Video Link</h4>
            <Form.Control
                type="text"
                placeholder="Drive link (ensure editor access)"
                name="vid"
                value={submissions.vid}
                onChange={handleInputChange}
            />
            <br />

            {/* Show error message if submission is invalid */}
            {submitted && !valid && <p style={{ color: 'red' }}>Please fill all required fields.</p>}

            <button type="submit" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Save and Continue'}
            </button>
        </div>
    );
};

export default Submissions;
