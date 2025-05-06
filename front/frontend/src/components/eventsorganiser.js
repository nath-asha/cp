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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import '../styles/buttons.css';
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
//         enddate: '',
//         type: '',
//         prizes: '',
//         // tracks: '',
//         // schedule: '',
//         scheduleDetails: '',
//         importantDates: '',
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
//                 enddate: currentEvent.enddate || '',
//                 type: currentEvent.type || '',
//                 prizes: currentEvent.prizes?.join(', ') || '',
//                 // tracks: currentEvent.tracks?.join(', ') || '',
//                 // schedule: currentEvent.schedule || '',
//                 scheduleDetails: JSON.stringify(currentEvent.scheduleDetails || []),
//                 importantDates: JSON.stringify(currentEvent.importantDates || []),
//             });
//         } else {
//             setFormData({
//                 title: '',
//                 desc: '',
//                 imgUrl: '',
//                 eventId: '',
//                 date: '',
//                 enddate: '',
//                 type: '',
//                 prizes: '',
//                 // tracks: '',
//                 // schedule: '',
//                 scheduleDetails: '',
//                 importantDates: '',
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
//             const updatedFormData = {
//                 ...formData,
//                 prizes: formData.prizes.split(',').map(item => item.trim()),
//                 // tracks: formData.tracks.split(',').map(item => item.trim()),
//                 scheduleDetails: JSON.parse(formData.scheduleDetails),
//                 importantDates: JSON.parse(formData.importantDates),
//                 venue: formData.venue,
//             };
//             if (currentEvent) {
//                 await axios.put(`http://localhost:5000/events/${currentEvent._id}`, updatedFormData);
//                 alert('Event updated successfully!');
//             } else {
//                 await axios.post('http://localhost:5000/events', updatedFormData);
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
//                 enddate: '',
//                 venue: '',
//                 prizes: '',
//                 // tracks: '',
//                 // schedule: '',
//                 scheduleDetails: '',
//                 importantDates: '',
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
//         <div className="container p-3">
//             <h1 className="mb-4">Events</h1>
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="form-control mb-3"
//             />
//             <form onSubmit={handleSubmit} className="mb-4">
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         value={formData.title}
//                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Description"
//                         value={formData.desc}
//                         onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Thumbnail Image URL"
//                         value={formData.imgUrl}
//                         onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Event ID"
//                         value={formData.eventId}
//                         onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="date"
//                         placeholder="Date"
//                         value={formData.date}
//                         onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
                
//                 <div className="mb-3">
//                     <input
//                         type="date"
//                         placeholder="End date"
//                         value={formData.enddate}
//                         onChange={(e) => setFormData({ ...formData, enddate: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Venue/Type (Online/Offline)"
//                         value={formData.venue}
//                         onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Prizes (comma separated)"
//                         value={formData.prizes}
//                         onChange={(e) => setFormData({ ...formData, prizes: e.target.value })}
//                         className="form-control"
//                     />
//                 </div>
//                 {/* <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Tracks (comma separated)"
//                         value={formData.tracks}
//                         onChange={(e) => setFormData({ ...formData, tracks: e.target.value })}
//                         className="form-control"
//                     />
//                 </div> */}
//                 {/* <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Schedule"
//                         value={formData.schedule}
//                         onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
//                         className="form-control"
//                     />
//                 </div> */}
//                 <div className="mb-3">
//                     <textarea
//                         placeholder="Schedule Details (JSON stringified)"
//                         value={formData.scheduleDetails}
//                         onChange={(e) => setFormData({ ...formData, scheduleDetails: e.target.value })}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <textarea
//                         placeholder="Important Dates (JSON stringified)"
//                         value={formData.importantDates}
//                         onChange={(e) => setFormData({ ...formData, importantDates: e.target.value })}
//                         className="form-control"
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                     {currentEvent ? 'Update' : 'Add'} Event
//                 </button>
//             </form>
//             <div className="row">
//                 {filteredEvents.map(event => (
//                     <div key={event._id} className="col-md-4 mb-4">
//                         <div className="card">
//                             <img src={event.imgUrl} className="card-img-top" alt={event.title} />
//                             <div className="card-body">
//                                 <h5 className="card-title">{event.title}</h5>
//                                 <p className="card-text">Event ID: {event.eventId}</p>
//                                 <p className="card-text">{event.desc}</p>
//                                 <p className="card-text">{event.date}</p>
//                                 <p className="card-text">{event.venue}</p>
//                                 <button
//                                     onClick={() => handleEdit(event)}
//                                     className="btn btn-warning me-2"
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         if (window.confirm(`Are you sure you want to delete event ${event.title}?`)) {
//                                             handleDelete(event._id);
//                                         }
//                                     }}
//                                     className="btn btn-danger"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default EventManager;

import React, { useState, useEffect } from 'react';
import '../styles/buttons.css';
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
        date: '',
        enddate: '',
        venue: '',
        prizes: [],
        scheduleDetails: [],
        importantDates: [],
    });
    const [newPrize, setNewPrize] = useState('');
    const [newScheduleDetail, setNewScheduleDetail] = useState({ date: '', event: '', time: '' });
    const [newImportantDate, setNewImportantDate] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (currentEvent) {
            setFormData({
                title: currentEvent.title || '',
                desc: currentEvent.desc || '',
                imgUrl: currentEvent.imgUrl || '',
                eventId: currentEvent.eventId || '',
                date: currentEvent.date || '',
                enddate: currentEvent.enddate || '',
                venue: currentEvent.venue || '',
                prizes: currentEvent.prizes || [],
                scheduleDetails: currentEvent.scheduleDetails || [],
                importantDates: currentEvent.importantDates || [],
            });
        } else {
            setFormData({
                title: '',
                desc: '',
                imgUrl: '',
                eventId: '',
                date: '',
                enddate: '',
                venue: '',
                prizes: [],
                scheduleDetails: [],
                importantDates: [],
            });
        }
        setNewPrize('');
        setNewScheduleDetail({ date: '', event: '', time: '' });
        setNewImportantDate('');
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

    const handleAddPrize = () => {
        if (newPrize.trim()) {
            setFormData({ ...formData, prizes: [...formData.prizes, newPrize.trim()] });
            setNewPrize('');
        }
    };

    const handleRemovePrize = (index) => {
        const updatedPrizes = [...formData.prizes];
        updatedPrizes.splice(index, 1);
        setFormData({ ...formData, prizes: updatedPrizes });
    };

    const handleAddScheduleDetail = () => {
        if (newScheduleDetail.date && newScheduleDetail.event && newScheduleDetail.time) {
            setFormData({ ...formData, scheduleDetails: [...formData.scheduleDetails, { ...newScheduleDetail }] });
            setNewScheduleDetail({ date: '', event: '', time: '' });
        }
    };

    const handleRemoveScheduleDetail = (index) => {
        const updatedScheduleDetails = [...formData.scheduleDetails];
        updatedScheduleDetails.splice(index, 1);
        setFormData({ ...formData, scheduleDetails: updatedScheduleDetails });
    };

    const handleAddImportantDate = () => {
        if (newImportantDate.trim()) {
            setFormData({ ...formData, importantDates: [...formData.importantDates, newImportantDate.trim()] });
            setNewImportantDate('');
        }
    };

    const handleRemoveImportantDate = (index) => {
        const updatedImportantDates = [...formData.importantDates];
        updatedImportantDates.splice(index, 1);
        setFormData({ ...formData, importantDates: updatedImportantDates });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (currentEvent) {
    //             await axios.put(`http://localhost:5000/events/${currentEvent._id}`, formData);
    //             alert('Event updated successfully!');
    //         } else {
    //             await axios.post('http://localhost:5000/events', formData);
    //             alert('Event created successfully!');
    //         }
    //         fetchEvents();
    //         setCurrentEvent(null);
    //         setFormData({
    //             title: '',
    //             desc: '',
    //             imgUrl: '',
    //             eventId: '',
    //             date: '',
    //             enddate: '',
    //             venue: '',
    //             prizes: [],
    //             scheduleDetails: [],
    //             importantDates: [],
    //         });
    //     } catch (error) {
    //         console.error("Error saving event:", error);
    //         alert('Error saving event.');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Debugging: Log the formData to inspect the payload
        console.log("Submitting formData:", formData);
    
        // Validate required fields
        if (!formData.title || !formData.desc || !formData.date || !formData.venue) {
            alert("Please fill in all required fields.");
            return;
        }
    
        try {
            if (currentEvent) {
                // Update existing event
                await axios.put(`http://localhost:5000/events/${currentEvent._id}`, formData);
                alert('Event updated successfully!');
            } else {
                // Create new event
                await axios.post('http://localhost:5000/events', formData);
                alert('Event created successfully!');
            }
    
            // Refresh the events list
            fetchEvents();
    
            // Reset the form
            setCurrentEvent(null);
            setFormData({
                title: '',
                desc: '',
                imgUrl: '',
                eventId: '',
                date: '',
                enddate: '',
                venue: '',
                prizes: [],
                scheduleDetails: [],
                importantDates: [],
            });
        } catch (error) {
            console.error("Error saving event:", error);
            alert('Error saving event.');
        }
    };
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container p-3">
            <h1 className="mb-4">Events</h1>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control mb-3"
            />
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Description"
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Thumbnail Image URL"
                        value={formData.imgUrl}
                        onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
                        className="form-control"
                        required
                    />
                </div>
                {/* <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Event ID"
                        value={formData.eventId}
                        onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                        className="form-control"
                        required
                    />
                </div> */}
                <div className="mb-3">
                    <input
                        type="date"
                        placeholder="Date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="date"
                        placeholder="End date"
                        value={formData.enddate}
                        onChange={(e) => setFormData({ ...formData, enddate: e.target.value })}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <select
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        className="form-control"
                        required
                    >
                        <option value="">Select Venue Type</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Prizes</label>
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Enter prize"
                            value={newPrize}
                            onChange={(e) => setNewPrize(e.target.value)}
                            className="form-control me-2"
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddPrize(); } }}
                        />
                        <button type="button" className="btn btn-outline-secondary" onClick={handleAddPrize}>Add</button>
                    </div>
                    {formData.prizes.length > 0 && (
                        <ul className="list-group mt-2">
                            {formData.prizes.map((prize, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {prize}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleRemovePrize(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Schedule Details</label>
                    {formData.scheduleDetails.map((detail, index) => (
                        <div key={index} className="card mb-2">
                            <div className="card-body">
                                <h6 className="card-title">Schedule Detail #{index + 1}</h6>
                                <p className="card-text">Date: {detail.date}</p>
                                <p className="card-text">Event: {detail.event}</p>
                                <p className="card-text">Time: {detail.time}</p>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleRemoveScheduleDetail(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Add New Schedule Detail</h6>
                            <div className="mb-2">
                                <input
                                    type="date"
                                    placeholder="Date"
                                    value={newScheduleDetail.date}
                                    onChange={(e) => setNewScheduleDetail({ ...newScheduleDetail, date: e.target.value })}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder="Event"
                                    value={newScheduleDetail.event}
                                    onChange={(e) => setNewScheduleDetail({ ...newScheduleDetail, event: e.target.value })}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="time"
                                    placeholder="Time"
                                    value={newScheduleDetail.time}
                                    onChange={(e) => setNewScheduleDetail({ ...newScheduleDetail, time: e.target.value })}
                                    className="form-control"
                                />
                            </div>
                            <button type="button" className="btn btn-outline-secondary" onClick={handleAddScheduleDetail}>Add Schedule</button>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Important Dates</label>
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Enter important date"
                            value={newImportantDate}
                            onChange={(e) => setNewImportantDate(e.target.value)}
                            className="form-control me-2"
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddImportantDate(); } }}
                        />
                        <button type="button" className="btn btn-outline-secondary" onClick={handleAddImportantDate}>Add</button>
                    </div>
                    {formData.importantDates.length > 0 && (
                        <ul className="list-group mt-2">
                            {formData.importantDates.map((date, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {date}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleRemoveImportantDate(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button type="submit" className="btn btn-primary">
                    {currentEvent ? 'Update' : 'Add'} Event
                </button>
            </form>
            <div className="row">
                {filteredEvents.map(event => (
                    <div key={event._id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={event.imgUrl} className="card-img-top" alt={event.title} />
                            <div className="card-body">
                                <h5 className="card-title">{event.title}</h5>
                                <p className="card-text">Event ID: {event.eventId}</p>
                                <p className="card-text">{event.desc}</p>
                                <p className="card-text">Date: {event.date}</p>
                                <p className="card-text">Venue: {event.venue}</p>
                                <button
                                    onClick={() => handleEdit(event)}
                                    className="btn btn-warning me-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm(`Are you sure you want to delete event ${event.title}?`)) {
                                            handleDelete(event._id);
                                        }
                                    }}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventManager;
// {
//     "eventId": "E025",
//     "title": "Technovation",
//     "desc": "Join us for our flagship event showcasing the latest advancements in technology, featuring keynote speakers, workshops, and networking opportunities.",
//     "imgUrl": "https://example.com/technovation_banner.jpg",
//     "date": "2025-11-15",
//     "venue": "Online",
//     "prizes": ["Best Innovation Award", "Runner-Up Prize", "Creative Award"],
//     "scheduleDetails": [
//       {
//         "date": "2025-11-15",
//         "event": "Opening Ceremony & Keynote",
//         "time": "9:00 AM - 10:30 AM"
//       },
//       {
//         "date": "2025-11-15",
//         "event": "Workshop: AI Fundamentals",
//         "time": "11:00 AM - 1:00 PM"
//       },
//       {
//         "date": "2025-11-15",
//         "event": "Lunch & Networking",
//         "time": "1:00 PM - 2:00 PM"
//       },
//       {
//         "date": "2025-11-15",
//         "event": "Panel Discussion: The Future of Robotics",
//         "time": "2:00 PM - 3:30 PM"
//       },
//       {
//         "date": "2025-11-16",
//         "event": "Workshop: Web Development with React",
//         "time": "10:00 AM - 12:00 PM"
//       },
//       {
//         "date": "2025-11-16",
//         "event": "Project Demonstrations & Judging",
//         "time": "1:00 PM - 3:00 PM"
//       },
//       {
//         "date": "2025-11-16",
//         "event": "Awards Ceremony & Closing Remarks",
//         "time": "3:30 PM - 4:30 PM"
//       }
//     ],
//     "importantdates": ["2025-10-01", "2025-10-15", "2025-11-01"]
//   }

///////////////////////recent before adding other fields
// import React, { useState, useEffect } from 'react';
// // import '../styles/buttons.css';
// import '../styles/buttons.css';
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
//     });

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     useEffect(() => {
//         if (currentEvent) {
//             setFormData({
//                 title: currentEvent.title || '',
//                 desc: currentEvent.description || '',
//                 imgUrl: currentEvent.imgurl || '',
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
//             setFormData({ title: '', desc: '', imgUrl: '', eventId: '' });
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
//             setFormData({title: '', desc: '', imgUrl: '', eventId: ''});
//         } catch (error) {
//             console.error("Error saving event:", error);
//             alert('Error saving event.');
//         }
//     };

//     const filteredEvents = events.filter(event => 
//         event.title.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="container p-3">
//             <h1 className="mb-4">Events</h1>
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="form-control mb-3"
//             />
//             <form onSubmit={handleSubmit} className="mb-4">
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         value={formData.title}
//                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Description"
//                         value={formData.desc}
//                         onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Thumbnail Image URL"
//                         value={formData.imgUrl}
//                         onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="Event ID"
//                         value={formData.eventId}
//                         onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
//                         className="form-control"
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <input
//                         type='date'
//                         placeholder="Date"
//                         // value={formData.date}
//                         // onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                         // className="form-control"
//                         // required
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="venue/type(online/offline)"
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="prizes(comma separated)"
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="tracks"
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder="schedule"
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <input
//                         type='text'
//                         placeholder="schedule details"
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <input
//                         type='text'
//                         placeholder="important dates"
//                     />
//                 </div>



//                 <button type="submit" className="btn btn-primary">
//                     {currentEvent ? 'Update' : 'Add'} Event
//                 </button>
//             </form>
//             <div className="row">
//                 {filteredEvents.map(event => (
//                     <div key={event._id} className="col-md-4 mb-4">
//                         <div className="card">
//                             <img src={event.imgUrl} className="card-img-top" alt={event.title} />
//                             <div className="card-body">
//                                 <h5 className="card-title">{event.title}</h5>
//                                 <p className="card-text">Event ID: {event.eventId}</p>
//                                 <p className="card-text">{event.desc}</p>
//                                 <button
//                                     onClick={() => handleEdit(event)}
//                                     className="btn btn-warning me-2"
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         if (window.confirm(`Are you sure you want to delete event ${event.title}?`)) {
//                                             handleDelete(event._id);
//                                         }
//                                     }}
//                                     className="btn btn-danger"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default EventManager;