import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddChallenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    imgurl: '',
    trackId: '',
    eventId: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [searchEventId, setSearchEventId] = useState('');

  const fetchChallenges = async (eventId = '') => {
    setLoading(true);
    setError('');
    try {
      let url = 'http://localhost:5000/challenges';
      if (eventId) url += `?eventId=${eventId}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch challenges');
      const data = await response.json();
      setChallenges(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleInputChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `http://localhost:5000/challenges/${editingId}`
        : 'http://localhost:5000/challenges';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error('Failed to save challenge');
      setForm({ title: '', description: '', imgurl: '', trackId: '', eventId: '' });
      setEditingId(null);
      fetchChallenges(searchEventId);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = challenge => {
    setForm({
      title: challenge.title,
      description: challenge.description,
      imgurl: challenge.imgurl || '',
      trackId: challenge.trackId || '',
      eventId: challenge.eventId || ''
    });
    setEditingId(challenge._id || challenge.id);
  };

  const handleSearch = e => {
    e.preventDefault();
    fetchChallenges(searchEventId);
  };

  return (
    <div className="container mt-5">
  <h2 className="mb-4 text-primary text-center fw-bold">Add or Edit a Problem Statement</h2>

  {/* Search Section */}
  <div className="card mb-4 shadow-sm">
    <div className="card-body">
      <form className="row g-2 align-items-center" onSubmit={handleSearch}>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Event ID"
            value={searchEventId}
            onChange={e => setSearchEventId(e.target.value)}
          />
        </div>
        <div className="col-sm-2 d-grid">
          <button className="btn btn-outline-primary" style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", minWidth: "fit-content", whiteSpace: "nowrap" }} type="submit">Search</button>
        </div>
      </form>
    </div>
  </div>

  {/* Form Section */}
  <div className="card mb-5 shadow-sm">
    <div className="card-header bg-primary text-white">
      <h4 className="mb-0">{editingId ? 'Edit Problem Statement' : 'Add New Problem Statement'}</h4>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-6">
            <label htmlFor="title" className="form-label fw-bold">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter challenge title"
              value={form.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="description" className="form-label fw-bold">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Short description"
              value={form.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="imgurl" className="form-label fw-bold">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="imgurl"
              name="imgurl"
              placeholder="http://..."
              value={form.imgurl}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="trackId" className="form-label fw-bold">Track ID</label>
            <input
              type="text"
              className="form-control"
              id="trackId"
              name="trackId"
              placeholder="e.g. AI-101"
              value={form.trackId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="eventId" className="form-label fw-bold">Event ID</label>
            <input
              type="text"
              className="form-control"
              id="eventId"
              name="eventId"
              placeholder="e.g. EVNT-2024"
              value={form.eventId}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mt-4 d-flex justify-content-end">
          <button
            className={`btn ${editingId ? 'btn-warning' : 'btn-success'} px-4`}
            type="submit"
          >
            {editingId ? 'Update Statement' : 'Add Statement'}
          </button>
        </div>
      </form>
    </div>
  </div>

  {/* Loading / Error */}
  {loading && (
    <div className="text-center my-3">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  )}
  {error && <div className="alert alert-danger">{error}</div>}

  {/* Challenge Cards */}
  <div className="row">
    {challenges.map((challenge) => (
      <div className="col-md-4 mb-4" key={challenge._id || challenge.id}>
        <div className="card h-100 shadow-sm">
          {challenge.imgurl && (
            <img
              src={challenge.imgurl}
              alt={challenge.title}
              className="card-img-top"
              style={{ maxHeight: '180px', objectFit: 'cover' }}
              onError={e => (e.target.style.display = 'none')}
            />
          )}
          <div className="card-body">
            <h5 className="card-title">{challenge.title}</h5>
            <p className="card-text">{challenge.description}</p>
            <p className="mb-1"><strong>Track ID:</strong> {challenge.trackId}</p>
            <p className="mb-0"><strong>Event ID:</strong> {challenge.eventId}</p>
            <button
              className="btn btn-sm btn-outline-primary mt-2"
              onClick={() => handleEdit(challenge)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    ))}
    {!loading && challenges.length === 0 && (
      <div className="text-center text-muted">No challenges found.</div>
    )}
  </div>
</div>

  );
};

export default AddChallenge;
