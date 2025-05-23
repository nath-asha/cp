import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";   
import { Button, Input } from 'bootstrap';

function CreateRubricTemplate() {
  const [eventId, setEventId] = useState("");
  const [criteria, setCriteria] = useState([{ name: "", weight: 0.25 }]);

  const handleAddCriteria = () => {
    setCriteria([...criteria, { name: "", weight: 0 }]);
  };

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:5000/api/rubric-template/${eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({criteria}),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:5000/api/rubric-template/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ criteria }),
  });
    const data = await response.json();
    console.log("Updated:", data);
};


  const handleDelete = async () => {
    const response = await fetch(`http://localhost:5000/api/rubric-template/${eventId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("Deleted:", data);
  }
  return (
    <div>
      <h2>Create Rubric Template</h2>
      <input placeholder="Event ID" onChange={e => setEventId(e.target.value)} />
      {criteria.map((c, i) => (
        <div key={i}>
          <input placeholder="Criterion Name" onChange={e => {
            const newC = [...criteria];
            newC[i].name = e.target.value;
            setCriteria(newC);
          }} />
          <input placeholder="Weight (e.g. 0.25)" type="number" step="0.01" onChange={e => {
            const newC = [...criteria];
            newC[i].weight = parseFloat(e.target.value);
            setCriteria(newC);
          }} />
        </div>
      ))}
      <button onClick={handleAddCriteria}>Add Criterion</button>
      <button onClick={handleSubmit}>Save Rubric</button>
    </div>
  );
}
export default CreateRubricTemplate;
