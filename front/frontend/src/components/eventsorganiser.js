import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventForm = ({ onAdd, currentEvent, onEdit }) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState('');

    useEffect(() => {
        if (currentEvent) {
            setTitle(currentEvent.title);
            setGenre(currentEvent.genre);
            setReleaseYear(currentEvent.releaseYear);
        } else {
            setTitle('');
            setGenre('');
            setReleaseYear('');
        }
    }, [currentEvent]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const event = { title, genre, releaseYear };

        if (currentEvent) {
            event._id = currentEvent._id;
            onEdit(event);
        } else {
            onAdd(event);
        }

        setTitle('');
        setGenre('');
        setReleaseYear('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Genre" 
                value={genre} 
                onChange={(e) => setGenre(e.target.value)} 
                required 
            />
            <input 
                type="number" 
                placeholder="Release Year" 
                value={releaseYear} 
                onChange={(e) => setReleaseYear(e.target.value)} 
                required 
            />
            <button type="submit">{currentEvent ? 'Update' : 'Add'} Event</button>
        </form>
    );
};

const EventCard = ({ event, onDelete, onEdit }) => {
    return (
        <div className="card">
            <h3>{event.title}</h3>
            <p>{event.genre}</p>
            <p>{event.releaseYear}</p>
            <button onClick={() => onEdit(event)}>Edit</button>
            <button onClick={() => onDelete(event._id)}>Delete</button>
        </div>
    );
}

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [currentEvent, setCurrentEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/events/${id}`);
            setEvents(events.filter(event => event._id !== id));
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };
    
    const handleEdit = (event) => {
        setCurrentEvent(event);
    };

    const handleUpdate = async (updatedEvent) => {
        await axios.put(`http://localhost:5000/events/${updatedEvent._id}`, updatedEvent);
        setCurrentEvent(null);
        fetchEvents();
    };

    const handleAdd = async (newEvent) => {
        await axios.post('http://localhost:5000/events', newEvent);
        fetchEvents();
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
            <EventForm 
                onAdd={handleAdd} 
                currentEvent={currentEvent} 
                onEdit={handleUpdate} 
            />
            <div className="event-list">
                {filteredEvents.map(event => (
                    <EventCard 
                        key={event._id} 
                        event={event}
                        onDelete={handleDelete} 
                        onEdit={handleEdit} 
                    />
                ))}
            </div>
        </div>
    );
};

export default EventList;

