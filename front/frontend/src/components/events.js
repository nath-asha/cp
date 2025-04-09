import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Container } from 'react-bootstrap';
import { useNavigate ,Link} from 'react-router-dom'; 
import '../styles/buttons.css';


function Events() {
  const [events, setEvents] = useState([]);
  const [eventSearch, setEventSearch] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events data:', err);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(eventSearch.toLowerCase())
  );

  // const handleKnowMoreClick = (eventId) => {
  //   // Navigate using React Router's useNavigate
  //   navigate(`/challenges/${eventId}`);
  // };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-black">Events</h2>
      <input
        type="text"
        placeholder="Search events by name..."
        value={eventSearch}
        onChange={(e) => setEventSearch(e.target.value)}
        className="form-control mb-4"
      />
      {filteredEvents.length > 0 ? (
        <>
          <h4>Currently Open</h4>
          <Carousel>
  {filteredEvents.map((event) => (
    <Carousel.Item key={event.event_id}>
      <img
        className="d-block w-100"
        src={event.imgUrl || 'https://via.placeholder.com/800x400'}
        alt={event.title}
      />
      <Carousel.Caption>
        <h3 className='text-black'>{event.title}</h3>
        <p className='text-black'>{event.description}</p>
        {/* <Link to={`/challenges/${event.eventId}`}> */}
        <Link to={`/displayevent/${event.eventId}`}>
          <button>Know more</button>
        </Link>
      </Carousel.Caption>
    </Carousel.Item>
  ))}
</Carousel>
        </>
      ) : (
        <p>No events found.</p>
      )}
      <h4 className="mt-5">Past Hackathons</h4>
      <h4>Upcoming Hackathons</h4>
    </Container>
  );
}

export default Events;

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Events() {
//   const [events, setEvents] = useState([]);
//   const [eventSearch, seteventSearch] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/events');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setEvents(data);
//         console.log(data);
//       } catch (err) {
//         console.error('Error fetching problem statement data:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredEvents = events.filter(events => events.title.toLowerCase().includes(participantSearch.toLowerCase()));

//   return (
//       <div className="row">
//         <input
//                     type="text"
//                     placeholder="Search events by name..."
//                     value={eventSearch}
//                     onChange={(e) => seteventSearch(e.target.value)}
//                     className="search-input"
//                 />
//         {filteredEvents.map((events) => (
//         {events.map((events) => (
//           <div className="col-md-4" key={events.event_id}>
//             <div className="card mb-4">
//               <div className="card-header">
//                 Track ID: {events.event_id}
//               </div>
//               <img src={events.imgUrl} className="card-img-top" alt="problem statement image" />
//               <div className="card-body">
//                 <h5 className="card-title">{events.title}</h5>
//                 <h6 className="card-subtitle mb-2 text-muted">{events.description}</h6>
//                 {/* <a href={`/challenges/${events.event_id}`}><button>Know more</button></a> */}
//                 <a href={`/challenges`}><button>Know more</button></a>
//                 {/* change the url so that each event navigates to its own set of problem statements /event-name/challenges event-name sourced from title from  */}
//               </div>
//             </div>
//           </div>
//         ))};
//       ))};
//         <h4>Past Hackathons</h4>
//         <h4>Currently Open</h4>
//         <h4>Upcoming Hackathons</h4>
//       </div>
//   );
// }

// export default Events;
