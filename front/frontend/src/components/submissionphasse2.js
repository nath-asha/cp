import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const token = sessionStorage.getItem("token");

const MultiSubmissions = () => {
    const [submissions, setSubmissions] = useState({
        gitrepo: "",
        preport: "",
        doc: ""
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [deadline, setDeadline] = useState(null);

    useEffect(() => {
        // Set deadlines for each step
        if (currentStep === 1) {
            setDeadline(new Date(Date.now() + 2 * 60 * 60 * 1000)); // 2 hours from now
        } else if (currentStep === 2) {
            setDeadline(new Date(Date.now() + 4 * 60 * 60 * 1000)); // 4 hours from now
        } else if (currentStep === 3) {
            setDeadline(new Date(Date.now() + 6 * 60 * 60 * 1000)); // 6 hours from now
        }
    }, [currentStep]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSubmissions((prevSubmissions) => ({
            ...prevSubmissions,
            [name]: value,
        }));
    };

    const handleNextStep = () => {
        if (new Date() > deadline) {
            alert("Deadline for this step has passed.");
            return;
        }
        setCurrentStep((prevStep) => prevStep + 1);
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

            {currentStep === 1 && (
                <Form>
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

                    <Button onClick={handleNextStep} className="btn btn-primary">
                        Next
                    </Button>
                </Form>
            )}

            {currentStep === 2 && (
                <Form>
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
                            onChange={(e) =>
                                setSubmissions((prev) => ({ ...prev, ps: e.target.value }))
                            }
                            required
                        >
                            <option value="">Select problem statement</option>
                            <option value="1">PS 1</option>
                            <option value="2">PS 2</option>
                            <option value="3">PS 3</option>
                            <option value="4">PS 4</option>
                        </Form.Select>
                    </Form.Group>

                    <Button onClick={handleNextStep} className="btn btn-primary">
                        Next
                    </Button>
                </Form>
            )}

            {currentStep === 3 && (
                <Form onSubmit={handleSubmit}>
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

                    <Button type="submit" className="btn btn-primary">
                        Submit
                    </Button>
                </Form>
            )}

            {deadline && (
                <div className="mt-3">
                    <Alert variant="warning">
                        Deadline for this step: {deadline.toLocaleString()}
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default MultiSubmissions;
