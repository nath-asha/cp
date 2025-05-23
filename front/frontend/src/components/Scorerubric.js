import React, { useState, useEffect } from "react";

function ScoreRubric() {
  const [eventId, setEventId] = useState("");
  const [rubric, setRubric] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (eventId) {
      fetch(`http://localhost:5000/api/rubric-template/${eventId}`)
        .then(res => res.json())
        .then(data => {
          setRubric(data.criteria || []);
          setScores((data.criteria || []).map(c => ({ criterion: c.name, score: 0 })));
        })
        .catch(err => {
          alert("Error fetching rubric: " + err.message);
        });
    }
  }, [eventId]);

  const handleScoreChange = (i, val) => {
    const newScores = [...scores];
    newScores[i].score = parseInt(val) || 0;
    setScores(newScores);
  };

  const handleSubmit = () => {
    const evaluatorName = ""; // Replace with actual value if available
    const comments = ""; // Replace with actual value if available

    fetch(`http://localhost:5000/api/rubric-score/${eventId}/team/${teamId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scores, evaluatorName, comments }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
        } else {
          console.log("Score submitted:", data);
        }
      })
      .catch(err => {
        alert("Error submitting score: " + err.message);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/rubric-score/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        console.log("Deleted:", data);
        setScores([]);
      });
  };

  const handleDisplay = () => {
    fetch(`http://localhost:5000/api/rubric-score/event/${eventId}/team/${teamId}`)
      .then(res => res.json())
      .then(data => {
        setScores(data.scores || []);
      });
  };

  const handleDisplayEventScore = () => {
    fetch(`http://localhost:5000/api/rubric-score/event/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setScores(data.scores || []);
      });
  };

  return (
    <div>
      <input
        placeholder="Event ID"
        value={eventId}
        onChange={e => setEventId(e.target.value)}
      />
      <input
        placeholder="Team ID"
        value={teamId}
        onChange={e => setTeamId(e.target.value)}
      />
      {rubric.map((c, i) => (
        <div key={i}>
          <label>{c.name} (Max: {c.maxScore})</label>
          <input
            type="number"
            min="0"
            max={c.maxScore}
            value={scores[i]?.score ?? ""}
            onChange={e => handleScoreChange(i, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Score</button>
      {/* Optional: Add buttons for other actions */}
      {/* <button onClick={() => handleDelete(someId)}>Delete Score</button>
      <button onClick={handleDisplay}>Display Team Score</button>
      <button onClick={handleDisplayEventScore}>Display Event Scores</button> */}
    </div>
  );
}

export default ScoreRubric;