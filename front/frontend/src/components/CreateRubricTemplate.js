import React, { useState } from "react";
import { useParams } from "react-router-dom";

function CreateRubricTemplate() {
  const { eventId } = useParams();
  const [criteria, setCriteria] = useState([
    { name: "", weight: 0.25, maxScore: 25 ,description: ""}
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...criteria];
    updated[index][field] = field === "weight" || field === "maxScore"
      ? parseFloat(value)
      : value;
    setCriteria(updated);
  };

  const handleAddCriteria = () => {
    setCriteria([...criteria, { name: "", weight: 0, maxScore: 25, description: ""}]);
  };

  const handleSubmit = async (method) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/rubric-template/${eventId}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ criteria }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Operation failed");
      setMessage(`${method === "POST" ? "Created" : "Updated"} successfully.`);
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/rubric-template/${eventId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      setCriteria([{ name: "", weight: 0.25, maxScore: 25, description: ""}]);
      setMessage("Deleted successfully.");
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
      <h2 className="text-black">Create / Update Rubric Template</h2>
      <p className="text-black"><strong>Event ID:</strong> {eventId}</p>
      {criteria.map((c, i) => (
        <div key={i} >
          <input
            placeholder="Parameter"
            value={c.name}
            onChange={e => handleChange(i, "name", e.target.value)}
            style={{ marginRight: 10, width: 180 }}
          />
           <input
            placeholder="Description"
            value={c.description}
            onChange={e => handleChange(i, "description", e.target.value)}
            style={{ marginRight: 10, width: 180 }}
          />
          <input
            placeholder="Weight"
            type="number"
            step="0.01"
            value={c.weight}
            onChange={e => handleChange(i, "weight", e.target.value)}
            style={{ marginRight: 10, width: 100 }}
          />
          <input
            placeholder="Max Score"
            type="number"
            value={c.maxScore}
            onChange={e => handleChange(i, "maxScore", e.target.value)}
            style={{ width: 100 }}
          />
        </div>
      ))}
      <button onClick={handleAddCriteria} style={{ marginRight: 10 }}>Add Criterion</button>
      <button onClick={() => handleSubmit("POST")} disabled={loading} style={{ marginRight: 5 }}>Create</button>
      <button onClick={() => handleSubmit("PUT")} disabled={loading} style={{ marginRight: 5 }}>Update</button>
      <button onClick={handleDelete} disabled={loading}>Delete</button>
      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </div>
  );
}

export default CreateRubricTemplate;

// {
//   "criteria": [
//     {
//       "name": "Innovation",
//       "description": "How novel or creative is the idea?",
//       "weight": 0.4,
//       "maxScore": 10
//     },
//     {
//       "name": "Technical Implementation",
//       "description": "Quality and depth of technical execution.",
//       "weight": 0.3,
//       "maxScore": 10
//     },
//     {
//       "name": "Impact",
//       "description": "Potential impact and usefulness of the solution.",
//       "weight": 0.3,
//       "maxScore": 10
//     }
//   ]
// }



// import React, { useState } from "react";

// function CreateRubricTemplate() {
//   const [eventId, setEventId] = useState("");
//   const [criteria, setCriteria] = useState([{ name: "", weight: 0.25, description: "", maxScore: 10 }]);

//   const handleAddCriteria = () => {
//     setCriteria([...criteria, { name: "", weight: 0, description: "", maxScore: 10 }]);
//   };

//   const handleChange = (index, field, value) => {
//     const updated = [...criteria];
//     updated[index][field] = field === "weight" || field === "maxScore" ? parseFloat(value) : value;
//     setCriteria(updated);
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/rubric-template/${eventId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ criteria }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Error creating template");
//       alert("Rubric template created successfully");
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/rubric-template/${eventId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ criteria }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Error updating template");
//       alert("Rubric template updated successfully");
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/rubric-template/${eventId}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Error deleting template");
//       alert("Rubric template deleted");
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   return (
//     <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
//       <h2>Create / Update Rubric Template</h2>
//       <input placeholder="Event ID" value={eventId} onChange={e => setEventId(e.target.value)} />
//       <br /><br />
//       {criteria.map((c, i) => (
//         <div key={i} style={{ marginBottom: 15 }}>
//           <input
//             placeholder="Criterion Name"
//             value={c.name}
//             onChange={e => handleChange(i, "name", e.target.value)}
//           />
//           <input
//             placeholder="Weight (e.g. 0.25)"
//             type="number"
//             step="0.01"
//             value={c.weight}
//             onChange={e => handleChange(i, "weight", e.target.value)}
//           />
//           <input
//             placeholder="Max Score"
//             type="number"
//             value={c.maxScore}
//             onChange={e => handleChange(i, "maxScore", e.target.value)}
//           />
//           <input
//             placeholder="Description"
//             value={c.description}
//             onChange={e => handleChange(i, "description", e.target.value)}
//           />
//         </div>
//       ))}
//       <button onClick={handleAddCriteria}>Add Criterion</button>
//       <br /><br />
//       <button onClick={handleSubmit}>Create Template</button>
//       <button onClick={handleUpdate}>Update Template</button>
//       <button onClick={handleDelete}>Delete Template</button>
//     </div>
//   );
// }

// export default CreateRubricTemplate;
