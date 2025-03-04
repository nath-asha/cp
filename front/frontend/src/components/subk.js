import React, { useState } from 'react';

function EventSubmissionForm() {
  const [formData, setFormData] = useState({

    name: '',

    email: '',

    phoneNumber: '',

  });



  const handleChange = (event) => {

    setFormData({ 

      ...formData, 

      [event.target.name]: event.target.value 

    });

  };



  const handleSubmit = async (event) => {

    event.preventDefault();



    try {

      const response = await fetch('/api/submit-event-registration', {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json'

        },

        body: JSON.stringify(formData)

      });



      if (response.ok) {

       

        console.log('Submission successful!');

      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

      </div>

      <button type="submit">Submit</button>

    </form>

  );

}



export default EventSubmissionForm;
