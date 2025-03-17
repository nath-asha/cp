import React from 'react';
import '../App.css';
import RotatingTimeline from "./header";
import Timer from './CountDown';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap's JS

const Home = () => {
    return (
        <div className='home'>
        <Timer />
            <h1>Welcome to the Hack A Fest!</h1>
            <p>Join us for an exciting event full of coding, collaboration, and creativity.</p>

            <button 
                onClick={() => window.location.href = '/lay'}
            >
                Register Now
            </button>

            {/* <div className="timeline">
                <h2>Event Schedule</h2>
                <div className='timeli'>
                    <div className='time'>
                        <strong>10:00 AM - Opening Ceremony</strong>
                        <p>Kick off the event with a welcome speech and introduction.</p>
                    </div>
                    <div className='time'>
                        <strong>11:00 AM - Keynote Speaker</strong>
                        <p>Hear from an industry expert about the latest trends in technology.</p>
                    </div>
                    <div className='time'>
                        <strong>1:00 PM - Lunch Break</strong>
                        <p>Enjoy a variety of food options and network with other participants.</p>
                    </div>
                    <div className='time'>
                        <strong>2:00 PM - Coding Workshops</strong>
                        <p>Participate in hands-on workshops to learn new skills and techniques.</p>
                    </div>
                    <div className='time'>
                        <strong>5:00 PM - Hackathon Begins</strong>
                        <p>Form teams and start working on your projects.</p>
                    </div>
                    <div className='time'>
                        <strong>8:00 PM - Dinner Break</strong>
                        <p>Take a break and enjoy a delicious dinner.</p>
                    </div>
                    <div className='time'>
                        <strong>9:00 PM - Continue Hacking</strong>
                        <p>Work through the night to complete your projects.</p>
                    </div>
                </div>
            </div> */}
            <RotatingTimeline />
            <div className='venue'>
                <p>
                    venue 1
                </p>
                <p>
                    venue 2
                </p>
                </div>
                <div className='important dates'>
                </div>
                <div className='prize'>
                </div>

            <div className='guildelines'>
                </div>
            <div className='faq'>
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                What software do I need?
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                Node.js and npm (or yarn).
                                A code editor (VS Code, Sublime Text, Atom).
                                A web browser (Chrome, Firefox).
                                Git (for version control).
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Should I bring a power adapter?
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body"> Yes, always bring a power adapter. Hackathons can be long, and you don't want your laptop to run out of battery.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                What if I run into technical issues?
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Work as a team to troubleshoot.
                                Utilize offline documentation.
                                Ask the hackathon organizers for assistance</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Home;

// import React from 'react';
// // import RegistrationForm from './register';
// import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import RotatingTimeline from "./header";
// // import FerrisWheelTimeline from "./FerrisWheelTimeline";
// // import { Card, CardContent, Typography } from '@material-ui/core';

// const Home = () => {
//     return (
//         <div class='home'>
//             <h1>Welcome to the Hack A Fest!</h1>
//             <p>Join us for an exciting event full of coding, collaboration, and creativity.</p>
//             <button
//                 style={{
//                     padding: '10px 20px',
//                     fontSize: '16px',
//                     cursor: 'pointer',
//                     backgroundColor: '#007BFF',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '5px'
//                 }}
//                 onClick={() => window.location.href = '/register'}>
//                 Register Now
//             </button>


//             <div class="timeline">
//                 <h2>Event Schedule</h2>
//                 <div class='timeli'>
//                     <div class='time'>
//                         <strong>10:00 AM - Opening Ceremony</strong>
//                         <p>Kick off the event with a welcome speech and introduction.</p>
//                     </div>
//                     <div class='time'>
//                         <strong>11:00 AM - Keynote Speaker</strong>
//                         <p>Hear from an industry expert about the latest trends in technology.</p>
//                     </div>
//                     <div class='time'>
//                         <strong>1:00 PM - Lunch Break</strong>
//                         <p>Enjoy a variety of food options and network with other participants.</p>
//                     </div>
//                     <div class='time'>
//                         <strong>2:00 PM - Coding Workshops</strong>
//                         <p>Participate in hands-on workshops to learn new skills and techniques.</p>
//                     </div>
//                     <div class='time'>
//                         <strong>5:00 PM - Hackathon Begins</strong>
//                         <p>Form teams and start working on your projects.</p>
//                     </div>
//                     <div class='time'>
//                         <strong>8:00 PM - Dinner Break</strong>
//                         <p>Take a break and enjoy a delicious dinner.</p>
//                     </div>                            <div class='time'>
//                         <strong>9:00 PM - Continue Hacking</strong>
//                         <p>Work through the night to complete your projects.</p>
//                     </div>
//                 </div>
//             </div>
//             <RotatingTimeline />
//             {/* <FerrisWheelTimeline /> */}
//             <div className='faq'>
//                 <div class="accordion accordion-flush" id="accordionFlushExample">
//                     <div class="accordion-item">
//                         <h2 class="accordion-header">
//                         <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
//                         What software do I need?
//                         </button>
//                         </h2>
//                     <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
//                     <   div class="accordion-body">Node.js and npm (or yarn).
//                         A code editor (VS Code, Sublime Text, Atom).
//                         A web browser (Chrome, Firefox).
//                         Git (for version control).</div>
//                         </div>
//                     </div>
//                 <div class="accordion-item">
//                     <h2 class="accordion-header">
//                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
//                     Should I bring a power adapter?
//                     </button>
//                     </h2>
//                     <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
//                         <div class="accordion-body"> Yes, always bring a power adapter. Hackathons can be long, and you don't want your laptop to run out of battery.
//                 </div>
//                     </div>
//                 </div>
//                 <div class="accordion-item">
//                     <h2 class="accordion-header">
//                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
//                         What if I run into technical issues?
//                     </button>
//                     </h2>
//                     <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
//                     <div class="accordion-body">Work as a team to troubleshoot.
//                 Utilize offline documentation.
//                 Ask the hackathon organizers for assistance</div>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;