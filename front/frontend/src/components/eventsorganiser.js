import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [currentEvent, setCurrentEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '', 
        imgurl: '', 
        eventId: '', 
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (currentEvent) {
            setFormData({
                title: currentEvent.title || '',
                description: currentEvent.description || '',
                imgurl: currentEvent.imgurl || '',
                eventId: currentEvent.eventId || '',
            });
        } else {
            setFormData({ title: '', description: '', imgurl: '', eventId: '' });
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
            } else {
                await axios.post('http://localhost:5000/events', formData);
            }
            fetchEvents();
            setCurrentEvent(null);
            setFormData({ title: '', desc: '', imgUrl: '', eventId: '' }); 
        } catch (error) {
            console.error("Error saving event:", error);
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
                        <p>{event.description}</p>
                        <img src={event.imgurl} alt={event.title} style={{ maxWidth: '500px' }} />
                        <button onClick={() => handleEdit(event)} style={{ marginRight: '10px' }}>Edit</button>
                        <button type="button" data-bs-toggle="modal" data-bs-target={`#delete-${event._id}`}>
                            Delete
                        </button>
                
                        <div className="modal fade" id={`delete-${event._id}`} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Are you sure you want to delete event {event.title}?</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button onClick={() => handleDelete(event._id)} type="button" className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventManager;