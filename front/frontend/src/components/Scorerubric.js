// import React, { useState, useEffect } from "react";

// function ScoreRubric() {
//   const [eventId, setEventId] = useState("");
//   const [teamId, setTeamId] = useState("");
//   const [rubric, setRubric] = useState([]);
//   const [scores, setScores] = useState([]);
//   const [evaluatorName, setEvaluatorName] = useState("");
//   const [comments, setComments] = useState("");

//   useEffect(() => {
//     if (eventId) {
//       fetch(`http://localhost:5000/api/rubric-template/${eventId}`)
//         .then(res => res.json())
//         .then(data => {
//           const criteria = data.criteria || [];
//           setRubric(criteria);
//           setScores(criteria.map(c => ({ criterion: c.name, score: 0 })));
//         })
//         .catch(err => alert("Error fetching rubric: " + err.message));
//     }
//   }, [eventId]);

//   const handleScoreChange = (i, val) => {
//     const newScores = [...scores];
//     newScores[i].score = parseInt(val) || 0;
//     setScores(newScores);
//   };

//   const handleSubmit = () => {
//     if (!eventId || !teamId || !evaluatorName) {
//       alert("Please fill in Event ID, Team ID and Evaluator Name.");
//       return;
//     }

//     fetch(`http://localhost:5000/api/rubric-score/${eventId}/team/${teamId}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ scores, evaluatorName, comments }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         alert(data.message || "Score submitted.");
//         setComments("");
//       })
//       .catch(err => alert("Error submitting score: " + err.message));
//   };

//   return (
//     <div style={{ padding: 20, maxWidth: "800px", margin: "auto" }}>
//       <h2>Rubric Scoring Table</h2>

//       <input
//         placeholder="Event ID"
//         value={eventId}
//         onChange={e => setEventId(e.target.value)}
//         style={{ marginRight: 10 }}
//       />
//       <input
//         placeholder="Team ID"
//         value={teamId}
//         onChange={e => setTeamId(e.target.value)}
//         style={{ marginRight: 10 }}
//       />
//       <input
//         placeholder="Evaluator Name"
//         value={evaluatorName}
//         onChange={e => setEvaluatorName(e.target.value)}
//       />
//       <br /><br />

//       <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "left" }}>
//         <thead>
//           <tr>
//             <th>Criterion</th>
//             <th>Description</th>
//             <th>Max Score</th>
//             <th>Score Given</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rubric.map((c, i) => (
//             <tr key={i}>
//               <td>{c.name}</td>
//               <td>{c.description || "-"}</td>
//               <td>{c.maxScore}</td>
//               <td>
//                 <input
//                   type="number"
//                   min="0"
//                   max={c.maxScore}
//                   value={scores[i]?.score || ""}
//                   onChange={e => handleScoreChange(i, e.target.value)}
//                   style={{ width: "60px" }}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <br />
//       <textarea
//         placeholder="Evaluator Comments"
//         rows={3}
//         style={{ width: "100%" }}
//         value={comments}
//         onChange={e => setComments(e.target.value)}
//       />
//       <br /><br />
//       <button onClick={handleSubmit}>Submit Score</button>
//     </div>
//   );
// }

// export default ScoreRubric;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ScoreRubric() {
  const { eventId, teamId } = useParams();
  const [rubric, setRubric] = useState([]);
  const [scores, setScores] = useState([]);
  const [evaluatorName, setEvaluatorName] = useState("");
  const [comments, setComments] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  // Fetch evaluator name from signed-in user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await fetch(`http://localhost:5000/signups/${userId}`);
        if (!response.ok) {
          console.warn(`Failed to fetch user data. Status: ${response.status}`);
          return;
        }

        const data = await response.json();
        if (data && data.name) {
          setEvaluatorName(data.name);
        } else {
          console.warn("No evaluator name found for this user.");
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  // Fetch rubric
  useEffect(() => {
    if (eventId) {
      fetch(`http://localhost:5000/api/rubric-template/${eventId}`)
        .then(res => {
          if (!res.ok) throw new Error("Rubric not found");
          return res.json();
        })
        .then(data => {
          const criteria = data.criteria || [];
          setRubric(criteria);
          setScores(criteria.map(c => ({ criterion: c.name, score: 0 })));
        })
        .catch(err => alert("Error fetching rubric: " + err.message));
    }
  }, [eventId]);

  // Fetch submissions for all teams in this event
  useEffect(() => {
    if (teamId) {
      setLoadingSubmissions(true);
      fetch(`http://localhost:5000/submissions/${teamId}`)
        .then(res => {
          if (!res.ok) throw new Error("Could not fetch submissions");
          return res.json();
        })
        .then(data => {
          setSubmissions(data);
        })
        .catch(err => {
          setSubmissions([]);
          alert("Error fetching submissions: " + err.message);
        })
        .finally(() => setLoadingSubmissions(false));
    }
  }, [teamId]);

  const handleScoreChange = (i, val) => {
    const newScores = [...scores];
    newScores[i].score = parseFloat(val) || 0;
    setScores(newScores);
  };

  const calculateTotalScore = () => {
    return scores.reduce((sum, s) => sum + (s.score || 0), 0);
  };

  const handleSubmit = () => {
    if (!evaluatorName) {
      alert("Please fill in all required fields.");
      return;
    }

    const totalScore = calculateTotalScore();

    fetch(`http://localhost:5000/api/rubric-score/${eventId}/team/${teamId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scores,
        evaluatorName,
        comments,
        totalScore,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message?.toLowerCase().includes("error")) throw new Error(data.message);
        alert("Score submitted successfully");
        setComments("");
      })
      .catch(err => alert("Error submitting score: " + err.message));
  };

  return (
    <div style={{ padding: 20, maxWidth: "900px", margin: "auto" }}>
      <h2>Evaluation Rubrics</h2>

      <h4>Team Submissions for this Event</h4>
      {loadingSubmissions ? (
        <div>Loading submissions...</div>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Team Name</th>
              <th>Submission Title</th>
              <th>Submitted At</th>
              <th>Download/View</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={5}>No submissions found for this event.</td>
              </tr>
            ) : (
              submissions.map((sub, idx) => (
                <tr key={idx}>
                  <td>{sub.teamId || sub.team_id}</td>
                  <td>{sub.teamName || sub.name}</td>
                  <td>{sub.title || sub.submissionTitle || "-"}</td>
                  <td>{sub.submittedAt ? new Date(sub.createdAt).toLocaleString() : "-"}</td>
                  <td>
                    {sub.fileUrl ? (
                      <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer">View</a>
                    ) : sub.link ? (
                      <a href={sub.link} target="_blank" rel="noopener noreferrer">View</a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Max Score</th>
            <th>Score Given</th>
          </tr>
        </thead>
        <tbody>
          {rubric.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.description || "-"}</td>
              <td>{c.maxScore}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  max={c.maxScore}
                  value={scores[i]?.score || ""}
                  onChange={e => handleScoreChange(i, e.target.value)}
                  style={{ width: "60px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <textarea
        placeholder="Evaluator Comments"
        rows={3}
        style={{ width: "100%" }}
        value={comments}
        onChange={e => setComments(e.target.value)}
      />
      <br /><br />
      <button onClick={handleSubmit}>Submit Score</button>
    </div>
  );
}

export default ScoreRubric;