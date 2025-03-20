import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Eventlist = () => {
    const [events, setevents] = useState([]);
    const [search, setSearch] = useState('');
    const [currentevent, setCurrentevent] = useState(null);

    useEffect(() => {
        fetchevents();
    }, []);

    const fetchevents = async () => {
        const response = await axios.get('http://localhost:5000/events');
        setevents(response.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/events/${id}`);
            setevents(events.filter(events => events._id !== id));
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };
    
    const handleEdit = (event) => {
        setCurrentevent(event);
    };

    const handleUpdate = async (updatedevent) => {
        await axios.put(`http://localhost:5000/api/movies/${updatedevent._id}`, updatedevent);
        setCurrentevent(null);
        fetchevents();
    };

    const handleAdd = async (newevent) => {
        await axios.post('http://localhost:5000/events', newevent);
        fetchevents();
    };

    const filteredevents = events.filter(events => 
        events.title.toLowerCase().includes(search.toLowerCase())
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
            <eventForm 
                onAdd={handleAdd} 
                currentevent={currentevent} 
                onEdit={handleUpdate} 
            />
            <div className="event-list">
                {filteredevents.map(events => (
                    <eventsCard 
                        key={events._id} 
                        event={events}
                        onDelete={handleDelete} 
                        onEdit={handleEdit} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Evenlist;