import React from "react";
import { motion } from "framer-motion";
import "../styles/FerrisWheelTimeline.css";

const outerEvents = [
  { time: "10:00 AM", title: "Opening Ceremony", description: "Kick off the event with a welcome speech." },
  { time: "11:00 AM", title: "Keynote Speaker", description: "Hear from an industry expert about technology." },
  { time: "1:00 PM", title: "Lunch Break", description: "Enjoy food and network with participants." },
  { time: "2:00 PM", title: "Coding Workshops", description: "Hands-on workshops to learn new skills." },
  { time: "5:00 PM", title: "Hackathon Begins", description: "Start working on projects." },
  { time: "8:00 PM", title: "Dinner Break", description: "Take a break and enjoy a meal." },
  { time: "9:00 PM", title: "Continue Hacking", description: "Work through the night to complete projects." },
];

const innerEvents = [
  { time: "10:30 AM", title: "Icebreaker Session", description: "Get to know fellow participants." },
  { time: "12:00 PM", title: "Panel Discussion", description: "Experts discuss industry challenges." },
  { time: "3:00 PM", title: "Mini Challenges", description: "Fun coding challenges with prizes." },
  { time: "6:00 PM", title: "Networking Session", description: "Meet industry professionals." },
  { time: "10:00 PM", title: "Game Night", description: "Unwind with fun games and activities." },
];

const FerrisWheelTimeline = () => {
  return (
    <div className="ferris-container">
      <h2>Event Timeline</h2>

      {/* Outer Ring (Main Schedule) */}
      <motion.div
        className="outer-ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {outerEvents.map((event, index) => (
          <div
            key={index}
            className="event"
            style={{
              transform: `rotate(${index * (360 / outerEvents.length)}deg) translateY(-170px)`,
            }}
          >
            <div className="event-content">
              <strong>{event.time} - {event.title}</strong>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Inner Ring (Parallel Track) */}
      <motion.div
        className="inner-ring"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {innerEvents.map((event, index) => (
          <div
            key={index}
            className="event small"
            style={{
              transform: `rotate(${index * (360 / innerEvents.length)}deg) translateY(-110px)`,
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
  );
};

export default FerrisWheelTimeline;
