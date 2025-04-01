// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EventManager = () => {
//     const [events, setEvents] = useState([]);
//     const [search, setSearch] = useState('');
//     const [currentEvent, setCurrentEvent] = useState(null);
//     const [formData, setFormData] = useState({
//         title: '',
//         desc: '',
//         imgUrl: '',
//         eventId: '',
//         date: '',
//         type: '',
//         prizes: [],
//         tracks: [],
//         schedule: '',
//         scheduleDetails: [],
//         importantdates: []
//     });

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     useEffect(() => {
//         if (currentEvent) {
//             setFormData({
//                 title: currentEvent.title || '',
//                 desc: currentEvent.desc || '',
//                 imgUrl: currentEvent.imgUrl || '',
//                 eventId: currentEvent.eventId || '',
//                 date: currentEvent.date || '',
//                 type: currentEvent.type || '',
//                 prizes: currentEvent.prizes || [],
//                 tracks: currentEvent.tracks || [],
//                 schedule: currentEvent.schedule || '',
//                 scheduleDetails: currentEvent.scheduleDetails || [],
//                 importantdates: currentEvent.importantdates || []
//             });
//         } else {
//             setFormData({
//                 title: '',
//                 desc: '',
//                 imgUrl: '',
//                 eventId: '',
//                 date: '',
//                 type: '',
//                 prizes: [],
//                 tracks: [],
//                 schedule: '',
//                 scheduleDetails: [],
//                 importantdates: []
//             });
//         }
//     }, [currentEvent]);

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
//         } catch (error) {
//             console.error('Error deleting event:', error);
//         }
//     };

//     const handleEdit = (event) => {
//         setCurrentEvent(event);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (currentEvent) {
//                 await axios.put(`http://localhost:5000/events/${currentEvent._id}`, formData);
//                 alert('Event updated successfully!');
//             } else {
//                 await axios.post('http://localhost:5000/events', formData);
//                 alert('Event created successfully!');
//             }
//             fetchEvents();
//             setCurrentEvent(null);
//             setFormData({
//                 title: '',
//                 desc: '',
//                 imgUrl: '',
//                 eventId: '',
//                 date: '',
//                 type: '',
//                 prizes: [],
//                 tracks: [],
//                 schedule: '',
//                 scheduleDetails: [],
//                 importantdates: []
//             });
//         } catch (error) {
//             console.error("Error saving event:", error);
//             alert('Error saving event.');
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
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Description"
//                     value={formData.desc}
//                     onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Thumbnail Image URL"
//                     value={formData.imgUrl}
//                     onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Event ID"
//                     value={formData.eventId}
//                     onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Date"
//                     value={formData.date}
//                     onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Type"
//                     value={formData.type}
//                     onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Prizes (comma separated)"
//                     value={formData.prizes.join(', ')}
//                     onChange={(e) => setFormData({ ...formData, prizes: e.target.value.split(',').map(item => item.trim()) })}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Tracks (comma separated)"
//                     value={formData.tracks.join(', ')}
//                     onChange={(e) => setFormData({ ...formData, tracks: e.target.value.split(',').map(item => item.trim()) })}
//                 />
//                 <input
//                     type="text"
//                     placeholder="Schedule"
//                     value={formData.schedule}
//                     onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Schedule Details (JSON stringified)"
//                     value={JSON.stringify(formData.scheduleDetails)}
//                     onChange={(e) => setFormData({ ...formData, scheduleDetails: JSON.parse(e.target.value) })}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Important Dates (JSON stringified)"
//                     value={JSON.stringify(formData.importantdates)}
//                     onChange={(e) => setFormData({ ...formData, importantdates: JSON.parse(e.target.value) })}
//                     required
//                 />
//                 <button type="submit">{currentEvent ? 'Update' : 'Add'} Event</button>
//             </form>
//             <div className="event-list">
//                 {filteredEvents.map(event => (
//                     <div key={event._id} className="card">
//                         <h3>{event.title}</h3>
//                         <p>Event ID: {event.eventId}</p>
//                         <p>{event.desc}</p>
//                         <img src={event.imgUrl} alt={event.title} style={{ maxWidth: '500px' }} />
//                         <button onClick={() => handleEdit(event)} style={{ marginRight: '10px' }}>Edit</button>
//                         <button onClick={() => {
//                             if (window.confirm(`Are you sure you want to delete event ${event.title}?`)) {
//                                 handleDelete(event._id);
//                             }
//                         }}>
//                             Delete
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default EventManager;

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