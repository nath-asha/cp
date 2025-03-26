import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
        console.log(data);
      } catch (err) {
        console.error('Error fetching problem statement data:', err);
      }
    };

    fetchData();
  }, []);


  return (
      <div className="row">
        {events.map((events) => (
          <div className="col-md-4" key={events.event_id}>
            <div className="card mb-4">
              <div className="card-header">
                Track ID: {events.event_id}
              </div>
              <img src={events.imgUrl} className="card-img-top" alt="problem statement image" />
              <div className="card-body">
                <h5 className="card-title">{events.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{events.description}</h6>
                {/* <a href={`/challenges/${events.event_id}`}><button>Know more</button></a> */}
                <a href={`/challenges`}><button>Know more</button></a>
                {/* change the url so that each event navigates to its own set of problem statements /event-name/challenges event-name sourced from title from  */}
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}

export default Events;
