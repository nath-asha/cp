import React,{useState,useEffect} from "react";
import axios from "axios";
import "../styles/register.css";
import { Form,Container,Row,Col } from "react-bootstrap";

const token = sessionStorage.getItem('token');

const Newsignup = () => {
 const [values, setValues] = useState({
 name: "",
 email: "",
 password: ""
 });

 const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues((values) => ({
        ...values,
        [name]: value
    }));
 };

 const [submitted, setSubmitted] = useState(false);
 const [valid,setValid] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();
    if(Object.values(values).every(value => value)) {
        setValid(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/signedup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });
            if(response.ok){
                console.log('User signed up successfully');
            }else{
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error:',error);
        }
    }
    setSubmitted(true);
 }
return(
    <div>
        <Form className="register-form">
            <input
            className="form-field"
            type="text"
            placeholder="name"
            value={values.name}
            onChange={handleInputChange} 
            />
            <input 
            className="form-field"
            type='email' 
            placeholder="email"
            value={values.email}
            onChange={handleInputChange}
            />
            <input 
            className="form-field"
            type='password'
            placeholder="password"
            value={values.password}
            onChange={handleInputChange}
            />
        </Form>
    </div>
)};

export default Newsignup;