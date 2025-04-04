import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Verification() {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await axios.get(`/api/auth/verify/${token}`); 
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Verification failed.');
        console.error('Verification error:', error);
      }
    }
    if (token) {
        verifyEmail();
    }

  }, [token]);

  return (
    <div>
      <h2 className='text-black'>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
}

export default Verification;