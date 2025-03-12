import React from "react";
import { motion } from "framer-motion";
import "../styles/RotatingTimeline.css";

const events = [
  { time: "10:00 AM", title: "Opening Ceremony", description: "Kick off the event with a welcome speech and introduction." },
  { time: "11:00 AM", title: "Keynote Speaker", description: "Hear from an industry expert about the latest trends in technology." },
  { time: "1:00 PM", title: "Lunch Break", description: "Enjoy a variety of food options and network with other participants." },
  { time: "2:00 PM", title: "Coding Workshops", description: "Participate in hands-on workshops to learn new skills and techniques." },
  { time: "5:00 PM", title: "Hackathon Begins", description: "Form teams and start working on your projects." },
  { time: "9:00 PM", title: "Continue Hacking", description: "Work through the night to complete your projects." },
];

// const events = [
//     { time: "10:00 AM", title: "Opening Ceremony" },
//     { time: "11:00 AM", title: "Keynote Speaker"},
//     { time: "1:00 PM", title: "Lunch Break" },
//     { time: "2:00 PM", title: "Coding Workshops" },
//     { time: "5:00 PM", title: "Hackathon Begins" },
//     { time: "8:00 PM", title: "Dinner Break"},
//     { time: "9:00 PM", title: "Continue Hacking" },
//   ];
  
const RotatingTimeline = () => {
  return (
    <div className="container">
    <div className="timeline-container">
      <h2>Event Schedule</h2>

      {/* Rotating Wheel */}
      <motion.div
        className="timeline-wheel"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {events.map((event, index) => (
          <div
            key={index}
            className="timeline-event"
            style={{
              transform: `rotate(${index * (360 / events.length)}deg) translateY(-140px)`,
            }}
          >
            <div className="event-content">
              <strong>{event.time} - {event.title}</strong>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
    </div>
  );
};

export default RotatingTimeline;

// import React from "react";
// import '../styles/challenges.css';

// function Challenges() {
//     return (
//         <div>
//         <h1>Challenges</h1>
       
//     <div class="cards-container">
//         <ul class="cards" style="--items: 26;">
//             <li style="--i: 01;">
//                 <input type="radio" id="item-23" name="gallery-item"/>
//                 <label for="item-23">2023</label>
//                 <h2>2023</h2>
//                 <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, perspiciatis dicta? In nihil quidem sunt omnis facilis quas corporis at, officia itaque!</p>
//             </li>
//             <li style="--i: 02;">
//                 <input type="radio" id="item-24" name="gallery-item"/>
//                 <label for="item-24">2024</label>
//                 <h2>2024</h2>
//                 <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, perspiciatis dicta? In nihil quidem sunt omnis facilis quas corporis at, officia itaque!</p>
//             </li>
//             <li style="--i: 03;">
//                 <input type="radio" id="item-25" name="gallery-item"/>
//                 <label for="item-25">2025</label>
//                 <h2>2025</h2>
//                 <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, perspiciatis dicta? In nihil quidem sunt omnis facilis quas corporis at, officia itaque!</p>
//             </li>
//         </ul>
//   </div>
//         </div>
//     );
//     }

// export default Challenges;