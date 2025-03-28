import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [currentEvent, setCurrentEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        desc: '', 
        imgUrl: '', 
        eventId: '', 
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (currentEvent) {
            setFormData({
                title: currentEvent.title || '',
                desc: currentEvent.description || '',
                imgUrl: currentEvent.imgurl || '',
                eventId: currentEvent.eventId || '',
            });
        } else {
            setFormData({ title: '', desc: '', imgUrl: '', eventId: '' });
        }
    }, [currentEvent]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/events');
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/events/${id}`);
            setEvents(events.filter(event => event._id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEdit = (event) => {
        setCurrentEvent(event);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentEvent) {
                await axios.put(`http://localhost:5000/events/${currentEvent._id}`, formData);
                alert('Event updated successfully!');
            } else {
                await axios.post('http://localhost:5000/events', formData);
                alert('Event created successfully!');
            }
            fetchEvents();
            setCurrentEvent(null);
            setFormData({title: '', desc: '', imgUrl: '', eventId: ''});
        } catch (error) {
            console.error("Error saving event:", error);
            alert('Error saving event.');
        }
    };

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>Events</h1>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Thumbnail Image URL"
                    value={formData.imgUrl}
                    onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Event ID"
                    value={formData.eventId}
                    onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                    required
                />
                <button type="submit">{currentEvent ? 'Update' : 'Add'} Event</button>
            </form>
            <div className="event-list">
                {filteredEvents.map(event => (
                    <div key={event._id} className="card">
                        <h3>{event.title}</h3>
                        <p>Event ID: {event.eventId}</p>
                        <p>{event.desc}</p>
                        <img src={event.imgUrl} alt={event.title} style={{ maxWidth: '500px' }} />
                        <button onClick={() => handleEdit(event)} style={{ marginRight: '10px' }}>Edit</button>
                        <button onClick={() => {
                            if (window.confirm(`Are you sure you want to delete event ${event.title}?`)) {
                                handleDelete(event._id);
                            }
                        }}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventManager;