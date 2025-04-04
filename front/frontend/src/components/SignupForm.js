import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            await axios.post("/api/auth/register", formData);
            setMessage("Check your email for the verification link.");
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                role: 'user',
                team: 'none',
                address: '',
                organization: '',
                description: '',
                skills: '',
                github_url: '',
                linkedin_url: '',
                Twitter_url: '',
                USN: '',
            });
        } catch (error) {
            setMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstname"
                    placeholder="first name"
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="last name"
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                />
                <input
                    type='number'
                    name="phone"
                    placeholder="Phone"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                type="text"
                placeholder="USN"
                name="USN"
                onChange={(e) => setFormData({ ...formData, USN: e.target.value })}
                />
             
              <input
                type="text"
                placeholder="Role"
                name="role"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />


              <input
                type="text"
                placeholder="Team"
                name="team"
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                />
             

              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              
              <input
                type="text"
                placeholder="Organization"
                name="organization"
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              

              <input
                type="text"
                placeholder="Description"
                name="description"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              

              <input
                type="text"
                placeholder="Skills"
                name="skills"
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              

              <input
                type="text"
                placeholder="GitHub URL"
                name="github_url"
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                />


              <input
                type="text"
                placeholder="LinkedIn URL"
                name="linkedin_url"
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                />
              
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter_url"
                onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                />
            
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignupForm;