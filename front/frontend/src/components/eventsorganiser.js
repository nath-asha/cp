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
                title: currentEvent.title,
                desc: currentEvent.desc,
                imgUrl: currentEvent.imgUrl,
                eventId: currentEvent.eventId,
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
                        <p>{event.desc}</p>
                        <img src={event.imgUrl} alt={event.title} style={{ maxWidth: '500px' }} />
                        {/* <button onClick={() => handleEdit(event)}>Edit</button>
                        <button onClick={() => handleDelete(event._id)}>Delete</button> */}
                        <button onClick={() => handleEdit(event)} style={{ marginRight: '10px' }}>Edit</button>
                        <button onClick={() => handleDelete(event._id)}>Delete</button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventManager;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EventForm = ({ onAdd, currentEvent, onEdit }) => {
//     const [title, setTitle] = useState('');
//     const [desc, setDesc] = useState('');
//     const [imgUrl, setImgUrl] = useState('');
//     const [eventId, setEventId] = useState('');

//     useEffect(() => {
//         if (currentEvent) {
//             setTitle(currentEvent.title);
//             setDesc(currentEvent.desc);
//             setImgUrl(currentEvent.imgUrl);
//             setEventId(currentEvent.eventId);
//         } else {
//             setTitle('');
//             setDesc('');
//             setImgUrl('');
//             setEventId('');
//         }
//     }, [currentEvent]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const event = { title, desc, imgUrl, eventId };

//         if (currentEvent) {
//             event._id = currentEvent._id;
//             onEdit(event);
//         } else {
//             onAdd(event);
//         }

//         setTitle('');
//         setDesc('');
//         setImgUrl('');
//         setEventId('');
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input 
//                 type="text" 
//                 placeholder="Title" 
//                 value={title} 
//                 onChange={(e) => setTitle(e.target.value)} 
//                 required 
//             />
//             <input 
//                 type="text" 
//                 placeholder="Description" 
//                 value={desc} 
//                 onChange={(e) => setDesc(e.target.value)} 
//                 required 
//             />
//             <input 
//                 type="text" 
//                 placeholder="Thumbnail Image URL" 
//                 value={imgUrl} 
//                 onChange={(e) => setImgUrl(e.target.value)} 
//                 required 
//             />
//             <input 
//                 type="text"
//                 placeholder="Event ID"
//                 value={eventId}
//                 onChange={(e) => setEventId(e.target.value)}
//                 required
//             />
//             <button type="submit">{currentEvent ? 'Update' : 'Add'} Event</button>
//         </form>
//     );
// };

// const EventCard = ({ event, onDelete, onEdit }) => {
//     return (
//         <div className="card">
//             <h3>{event.title}</h3>
//             <p>Event ID: {event.eventId}</p>
//             <p>{event.desc}</p>
//             <img src={event.imgurl} alt={event.title} style={{ maxWidth: '500px' }} />
//             <button onClick={() => onEdit(event)}>Edit</button>
//             <button onClick={() => onDelete(event._id)}>Delete</button>
//         </div>
//     );
// };

// const EventList = () => {
//     const [events, setEvents] = useState([]);
//     const [search, setSearch] = useState('');
//     const [currentEvent, setCurrentEvent] = useState(null);

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     const fetchEvents = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/events');
//             setEvents(response.data);
//         } catch (error) {
//             console.error("Error fetching events:", error);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/events/${id}`);
//             setEvents(events.filter(event => event._id !== id));
//         } catch (err) {
//             console.error('Error deleting event:', err);
//         }
//     };

//     const handleEdit = (event) => {
//         setCurrentEvent(event);
//     };

//     const handleUpdate = async (updatedEvent) => {
//         try {
//             await axios.put(`http://localhost:5000/events/${updatedEvent._id}`, updatedEvent);
//             setCurrentEvent(null);
//             fetchEvents();
//         } catch (error) {
//             console.error("Error updating event:", error);
//         }
//     };

//     const handleAdd = async (newEvent) => {
//         try {
//             await axios.post('http://localhost:5000/events', newEvent);
//             fetchEvents();
//         } catch (error) {
//             console.error("Error adding event:", error);
//         }
//     };

//     const filteredEvents = events.filter(event => 
//         event.title.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div>
//             <h1>Events</h1>
//             <input 
//                 type="text" 
//                 placeholder="Search..." 
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="search-input"
//             />
//             <EventForm 
//                 onAdd={handleAdd} 
//                 currentEvent={currentEvent} 
//                 onEdit={handleUpdate} 
//             />
//             <div className="event-list">
//                 {filteredEvents.map(event => (
//                     <EventCard 
//                         key={event._id} 
//                         event={event}
//                         onDelete={handleDelete} 
//                         onEdit={handleEdit} 
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default EventList;