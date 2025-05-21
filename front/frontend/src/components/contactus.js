import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUS = () => {
    const [buttonText, setButtonText] = useState('Send Message');
    const [buttonVariant, setButtonVariant] = useState('primary');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const originalText = buttonText;
    //     setButtonText('Success!');
    //     setButtonVariant('success');

    //     setTimeout(() => {
    //         setButtonText(originalText);
    //         setButtonVariant('primary');
    //         e.target.reset();
    //     }, 2000);
    // };

    // ...inside ContactUS component
const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
        firstName: form[0].value,
        lastName: form[1].value,
        email: form[2].value,
        message: form[3].value,
    };

    setButtonText('Sending...');
    setButtonVariant('secondary');

    try {
        const response = await fetch('http://localhost:5000/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            setButtonText('Success!');
            setButtonVariant('success');
            form.reset();
        } else {
            setButtonText('Failed!');
            setButtonVariant('danger');
        }
    } catch {
        setButtonText('Error!');
        setButtonVariant('danger');
    }
    setTimeout(() => {
        setButtonText('Send Message');
        setButtonVariant('primary');
    }, 2000);
};

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center bg-light" id="contact">
            <div className="col-md-6 col-lg-5 bg-white rounded shadow p-4">
                <h2 className="mb-4 text-center text-primary">Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" required />
                        </div>
                        <div className="col">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea className="form-control" rows="4" required></textarea>
                    </div>
                    <button type="submit" style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }} className={`btn btn-${buttonVariant} w-100`}>
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUS;
