import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardText, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/buttons.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [eventSearch, setEventSearch] = useState('');
  const [pastEvents, setPastEvents] = useState([]);
  const [presentEvents, setPresentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

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

  useEffect(() => {
    const today = new Date();
    const past = events.filter((event) => new Date(event.date) < today);
    const present = events.filter((event) => {
      const startDate = new Date(event.date);
      const endDate = new Date(event.enddate || event.date);
      return startDate <= today && endDate >= today;
    });
    const upcoming = events.filter((event) => new Date(event.date) > today);

    setPastEvents(past);
    setPresentEvents(present);
    setUpcomingEvents(upcoming);
  }, [events]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setEventSearch(searchTerm);
  };

  const filterEventsBySearch = (eventList) => {
    return eventList.filter(event =>
      event.title.toLowerCase().includes(eventSearch.toLowerCase())
    );
  };

  const searchedPastEvents = filterEventsBySearch(pastEvents);
  const searchedPresentEvents = filterEventsBySearch(presentEvents);
  const searchedUpcomingEvents = filterEventsBySearch(upcomingEvents);

  const renderEventList = (eventList, heading) => {
    if (eventList.length > 0) {
      return (
        <>
          <h4 className="mt-4">{heading}</h4>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {eventList.map((event) => (
              <Col key={event.event_id}>
                <Card>
                  <CardBody>
                    <img
                      className='d-block w-100'
                      src={event.imgUrl || 'https://via.placeholder.com/800x400'}
                      alt={event.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <CardText>
                      <h3 className='text-black'>{event.title}</h3>
                      <p className='text-black'>{event.description && event.description.substring(0, 100)}...</p>
                      <Link to={`/displayevent/${event.eventId}`}>
                        <button className="btn btn-primary mt-2">Know more</button>
                      </Link>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      );
    } else if (eventSearch && heading !== "All Events") {
      return <p>No {heading.toLowerCase()} found matching your search.</p>;
    } else if (!eventSearch && heading !== "All Events") {
      return <p>No {heading.toLowerCase()} available.</p>;
    }
    return null;
  };

  const allEventsFiltered = filterEventsBySearch(events);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-black">Events</h2>
      <input
        type="text"
        placeholder="Search events by name..."
        value={eventSearch}
        onChange={handleSearch}
        className="form-control mb-4"
      />

      {eventSearch && allEventsFiltered.length > 0 && (
        <>
          <h4 className="mt-4">Search Results</h4>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {allEventsFiltered.map((event) => (
              <Col key={event.event_id}>
                <Card>
                  <CardBody>
                    <img
                      className='d-block w-100'
                      src={event.imgUrl || 'https://via.placeholder.com/800x400'}
                      alt={event.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <CardText>
                      <h3 className='text-black'>{event.title}</h3>
                      <h3 className='text-black'>{event.date}</h3>
                      <h3 className='text-black'>{event.enddate}</h3>
                      <p className='text-black'>{event.desc}</p>
                      <Link to={`/displayevent/${event.eventId}`}>
                        <button className="btn btn-primary mt-2">Know more</button>
                      </Link>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {!eventSearch && (
        <>
          {renderEventList(presentEvents, 'Present Events')}
          {renderEventList(upcomingEvents, 'Upcoming Events')}
          {renderEventList(pastEvents, 'Past Events')}
        </>
      )}
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
