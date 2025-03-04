import {React,useEffect, useState } from "react";

const Timer = () => {
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [countdownStarted, setCountdownStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    

    return(
        <div className="countdowntimer">

        </div>
    );
};

export default Timer;