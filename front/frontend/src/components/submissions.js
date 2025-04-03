import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const token = sessionStorage.getItem("token");

const Submissions = () => {
  const [submissions, setSubmissions] = useState({
    title: "",
    gitrepo: "",
    projectdesc: "",
    ps: "",
    ppt: "",
    thumbnail: "",
    preport: "",
    doc: "",
    vid: "",
    team_id: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubmissions((prevSubmissions) => ({
      ...prevSubmissions,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    setSubmissions((prevSubmissions) => ({
      ...prevSubmissions,
      ps: event.target.value,
    }));
  };

  const handleReset = () => {
    setSubmissions({
      title: "",
      gitrepo: "",
      projectdesc: "",
      ps: "",
      ppt: "",
      thumbnail: "",
      preport: "",
      doc: "",
      vid: "",
      team_id: "",
    });
    setSubmitted(false);
    setValid(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const { title, gitrepo, projectdesc, ps } = submissions;
    if (!title || !gitrepo || !projectdesc || !ps) {
      alert("Please fill in all required fields.");
      return;
    }

    setValid(true);

    try {
      const response = await fetch("http://localhost:5000/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submissions),
      });

      if (response.ok) {
        console.log("Submission successful");
        setSubmitted(true);
      } else {
        console.error("Failed to submit");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Project Submission</h2>

      {submitted && (
        <Alert variant="success" className="text-center">
          Submission successful! Thank you for submitting your project.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Project Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project title"
            name="title"
            value={submissions.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>GitHub Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="github.com/username"
            name="gitrepo"
            value={submissions.gitrepo}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Describe your project"
            name="projectdesc"
            value={submissions.projectdesc}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Problem Statement</Form.Label>
          <Form.Select
            value={submissions.ps}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select problem statement</option>
            <option value="1">PS 1</option>
            <option value="2">PS 2</option>
            <option value="3">PS 3</option>
            <option value="4">PS 4</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>PPT / Link Upload</Form.Label>
          <Form.Control
            type="text"
            placeholder="Drive link (ensure editor permissions)"
            name="ppt"
            value={submissions.ppt}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Thumbnail Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Drive link (ensure editor permissions)"
            name="thumbnail"
            value={submissions.thumbnail}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Report Upload</Form.Label>
          <Form.Control
            type="text"
            placeholder="Drive link (ensure editor permissions)"
            name="preport"
            value={submissions.preport}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Document Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Drive link (ensure editor permissions)"
            name="doc"
            value={submissions.doc}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Video Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Drive link (ensure editor permissions)"
            name="vid"
            value={submissions.vid}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
          <Button
            variant="secondary"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Form>

      <div className="mt-5">
        <h4>Preview</h4>
        <ul>
          <li>
            <strong>GitHub:</strong>{" "}
            <a href={submissions.gitrepo} target="_blank" rel="noreferrer">
              {submissions.gitrepo}
            </a>
          </li>
          <li>
            <strong>PPT:</strong>{" "}
            <a href={submissions.ppt} target="_blank" rel="noreferrer">
              {submissions.ppt}
            </a>
          </li>
          <li>
            <strong>Thumbnail:</strong>{" "}
            <a href={submissions.thumbnail} target="_blank" rel="noreferrer">
              {submissions.thumbnail}
            </a>
          </li>
          <li>
            <strong>Video:</strong>{" "}
            <a href={submissions.vid} target="_blank" rel="noreferrer">
              {submissions.vid}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Submissions;

//old code first attempt
// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css';

// const Submissions = () => {
//   const [submissions, setSubmissions] = useState({
//     title: '',
//     gitrepo: '',
//     projectdesc: '',
//     ps: '',
//     ppt: '',
//     thumbnail: '',
//     preport: '', 
//     doc: '',
//     vid: '',
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [valid, setValid] = useState(false);

//   const handleInputChange = (event) => {
//     const { name, value} = event.target;
//       setSubmissions((prevSubmissions) => ({
//         ...prevSubmissions,
//         [name]: value,
//       }));
//     };

//   const handleSelectChange = (event) => {
//     setSubmissions((prevSubmissions) => ({
//       ...prevSubmissions,
//       ps: event.target.value,
//     }));
//   };

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (Object.values(submissions).every((value) => value || value === null)) {
//       setValid(true);
//       try {
//         const formData = new FormData();
//         formData.append('preport', submissions.preport);
//         formData.append('title', submissions.title);
//         formData.append('gitrepo', submissions.gitrepo);
//         formData.append('projectdesc', submissions.projectdesc);
//         formData.append('ps', submissions.ps);
//         formData.append('ppt', submissions.ppt);
//         formData.append('thumbnail', submissions.thumbnail);
//         formData.append('doc', submissions.doc);
//         formData.append('vid', submissions.vid);
//         const response = await fetch('http://localhost:5000/api/submissions', {
//           method: 'POST',
//           body: formData,
//         });
//         if (response.ok) {
//           console.log('Submission successful');
//         } else {
//           console.error('Failed to submit');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//     setSubmitted(true);
//   };

//   return (
//     <div className="container md-5">
//       {/* <ul className="nav nav-tabs">
//   <li class="nav-item">
//     <a class="nav-link active" aria-current="page" href="#">Members</a>
//   </li>
//   <li>
//     <a class='nav-link active' aria-current='step' href='#'>Project details</a>
//   </li>
//   <li>
//     <a> Attachments</a>
//   </li>
//   </ul> */}
//       <h4>Team Name</h4>
//       <p>Manage team
// Add, remove, and look for teammates.

// Invite teammates
// Either share the link below privately with your teammates or send an invite link via email
// Add team members via email 
// someone@example.com
// Send invite
// Secret invite link 
// https://devpost.com/software/884540/joins/1RBybDRmBCT79vm8aDBlGg
//  Copy</p>

//       <h4>Project Title</h4>
//       <Form.Control
//         type="text"
//         placeholder="title"
//         name="title"
//         value={submissions.title}
//         onChange={handleInputChange}
//       />
//       <br />
//       <h4>Github link</h4>
//       <Form.Control
//         type="text"
//         placeholder="github.com/username"
//         name="gitrepo"
//         value={submissions.gitrepo}
//         onChange={handleInputChange}
//       />
//       <br />
//       <h4>Built with?(Description)</h4>
//       <Form.Group className="mb-3">
//         <Form.Control
//           as="textarea"
//           rows={3}
//           placeholder="describe your project what it does and how it helps or anything you would like us to know"
//           name="projectdesc"
//           value={submissions.projectdesc}
//           onChange={handleInputChange}
//         />
//       </Form.Group>

//       <h4>Select Problem Statement</h4>
//       <Form.Select value={submissions.ps} onChange={handleSelectChange}>
//         <option value="">select problem statement</option>
//         <option value="1">ps 1</option>
//         <option value="2">ps 2</option>
//         <option value="3">ps 3</option>
//         <option value="4">ps 4</option>
//       </Form.Select>
//       <h4>PPT /Link Upload</h4>
//       <Form.Control
//         type="text"
//         placeholder="drive link here ps:change permissions to editor"
//         name="ppt"
//         value={submissions.ppt}
//         onChange={handleInputChange}
//       />
//       <br />
//       <h4>Thumbnail link(OR Screenshot of the main page)</h4>
//       <Form.Control
//         type="text"
//         placeholder="drive link here ps:change permissions to editor"
//         name="thumbnail"
//         value={submissions.thumbnail}
//         onChange={handleInputChange}
//       />
//       <br />
//       <h4>Report Upload</h4>
//       <Form.Control
//         type="text"
//         placeholder="drive link here ps:change permissions to editor"
//         name="preport"
//         value={submissions.preport}
//         onChange={handleInputChange}
//       />

//       <h4>Document link</h4>
//       <Form.Control
//         type="text"
//         placeholder="drive link here ps:change permissions to editor"
//         name="doc"
//         value={submissions.doc}
//         onChange={handleInputChange}
//       />
//       <br />
//       <h4>Video Link</h4>
//       <Form.Control
//         type="text"
//         placeholder="drive link here ps:change permissions to editor"
//         name="vid"
//         value={submissions.vid}
//         onChange={handleInputChange}
//       />
//       <br />

//       <button type="submit" onClick={handleSubmit}>
//         Save and Continue
//       </button>
//       <br />
//       <button>Cancel</button>
//     </div>
//   );
// };

// export default Submissions;