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
    preport: '', 
    doc: '',
    vid: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleInputChange = (event) => {
    const { name, value} = event.target;
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(submissions).every((value) => value || value === null)) {
      setValid(true);
      try {
        const formData = new FormData();
        formData.append('preport', submissions.preport);
        formData.append('title', submissions.title);
        formData.append('gitrepo', submissions.gitrepo);
        formData.append('projectdesc', submissions.projectdesc);
        formData.append('ps', submissions.ps);
        formData.append('ppt', submissions.ppt);
        formData.append('thumbnail', submissions.thumbnail);
        formData.append('doc', submissions.doc);
        formData.append('vid', submissions.vid);
        const response = await fetch('http://localhost:5000/api/submissions', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          console.log('Submission successful');
        } else {
          console.error('Failed to submit');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setSubmitted(true);
  };

  return (
    <div className="container md-5">
      <h4>Team Name</h4>
      <h4>Project Title</h4>
      <Form.Control
        type="text"
        placeholder="title"
        name="title"
        value={submissions.title}
        onChange={handleInputChange}
      />
      <br />
      <h4>Github link</h4>
      <Form.Control
        type="text"
        placeholder="github.com/username"
        name="gitrepo"
        value={submissions.gitrepo}
        onChange={handleInputChange}
      />
      <br />
      <h4>Built with?(Description)</h4>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="describe your project what it does and how it helps or anything you would like us to know"
          name="projectdesc"
          value={submissions.projectdesc}
          onChange={handleInputChange}
        />
      </Form.Group>

      <h4>Select Problem Statement</h4>
      <Form.Select value={submissions.ps} onChange={handleSelectChange}>
        <option value="">select problem statement</option>
        <option value="1">ps 1</option>
        <option value="2">ps 2</option>
        <option value="3">ps 3</option>
        <option value="4">ps 4</option>
      </Form.Select>
      <h4>PPT /Link Upload</h4>
      <Form.Control
        type="text"
        placeholder="drive link here ps:change permissions to editor"
        name="ppt"
        value={submissions.ppt}
        onChange={handleInputChange}
      />
      <br />
      <h4>Thumbnail link(OR Screenshot of the main page)</h4>
      <Form.Control
        type="text"
        placeholder="drive link here ps:change permissions to editor"
        name="thumbnail"
        value={submissions.thumbnail}
        onChange={handleInputChange}
      />
      <br />
      <h4>Report Upload</h4>
      <Form.Control
        type="text"
        placeholder="drive link here ps:change permissions to editor"
        name="preport"
        value={submissions.preport}
        onChange={handleInputChange}
      />

      <h4>Document link</h4>
      <Form.Control
        type="text"
        placeholder="drive link here ps:change permissions to editor"
        name="doc"
        value={submissions.doc}
        onChange={handleInputChange}
      />
      <br />
      <h4>Video Link</h4>
      <Form.Control
        type="text"
        placeholder="drive link here ps:change permissions to editor"
        name="vid"
        value={submissions.vid}
        onChange={handleInputChange}
      />
      <br />

      <button type="submit" onClick={handleSubmit}>
        Save and Continue
      </button>
      <br />
      <button>Cancel</button>
    </div>
  );
};

export default Submissions;