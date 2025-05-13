import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AddChallenge = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [trackId, setTrackId] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [eventId, setEventId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/challenges', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          trackId,
          imgurl,
          eventId
        }),
      });

      if (response.ok) {
        setSuccessMessage('Challenge added successfully!');
        setTitle('');
        setDescription('');
        setTrackId('');
        setImgurl('');
        setEventId('');
      } else {
        const errorData = await response.json();
        setError(`Failed to add challenge: ${errorData.message || response.statusText}`);
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className='text-center'>Add New Challenge</h3>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="trackId" className="form-label">
            Track ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="trackId"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imgurl" className="form-label">
            Image URL:
          </label>
          <input
            type="url"
            className="form-control"
            id="imgurl"
            value={imgurl}
            onChange={(e) => setImgurl(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eventId" className="form-label">
            Event ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="eventId"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Challenge'}
        </button>
      </form>
    </div>
  );
};

export default AddChallenge;