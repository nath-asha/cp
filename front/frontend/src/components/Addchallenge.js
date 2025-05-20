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
      <h2 className="mb-4 text-primary text-center">Challenges</h2>

      {/* Search by Event ID */}
      <form className="mb-3 d-flex" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by Event ID"
          value={searchEventId}
          onChange={e => setSearchEventId(e.target.value)}
        />
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>

      {/* Add/Edit Form */}
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="imgurl"
              placeholder="Image URL"
              value={form.imgurl}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="trackId"
              placeholder="Track ID"
              value={form.trackId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              name="eventId"
              placeholder="Event ID"
              value={form.eventId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-1 d-grid">
            <button className="btn btn-success" type="submit">
              {editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

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
                  onError={e => e.target.style.display='none'}
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
