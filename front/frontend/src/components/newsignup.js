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
            const response = await fetch
        } catch (error) {
            
        }
    }
 }
return(

)};

export default Newsignup;