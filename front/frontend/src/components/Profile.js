import React, { useEffect, useState } from 'react';
import { useAuth } from "../provider/AuthProvider";
import {
    Container, Row, Col, Image, Button, Badge, ListGroup, Card, ProgressBar
} from 'react-bootstrap';
import {
    FaGithub, FaLinkedin, FaTwitter, FaShareAlt, FaCode, FaAward, FaLink
} from 'react-icons/fa';
import { BiRocket } from 'react-icons/bi';

const Profile = () => {
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const logoutHandler = () => logout();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/users/${user.email}`);
                const data = await response.json();
                setUserData(data);
                console.log("See",data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user?.providerData?.[0]?.providerId === 'google.com') {
            fetchUserData();
        } else {
            setUserData(user); // fallback for non-Google providers
        }
    }, [user]);

    if (!user || !userData) {
        return <div className="d-flex align-items-center justify-content-center vh-100"><h1>Loading...</h1></div>;
    }

    const shareProfileUrl = window.location.href;
    const themedBackgrounds = [
        'linear-gradient(135deg, #43CBFF 0%, #97F9F7 100%)'
        // 'linear-gradient(45deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 98%)',
        // 'linear-gradient(to right, #24C6DC, #514A9D)',
    ];
    const randomBackground = themedBackgrounds[Math.floor(Math.random() * themedBackgrounds.length)];

    const getSkillLevel = (skill) => {
        const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
        return levels[Math.floor(Math.random() * levels.length)];
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100 justify-content-center">
                <Col xs={12} md={10} lg={8} xl={7}>
                    <Card className="shadow-lg rounded-4 p-4" style={{ background: randomBackground, color: 'white' }}>
                        <div className="text-center mb-4">
                            <Image
                                src={userData.picture}
                                alt={`${userData.firstName} ${userData.lastName}`}
                                roundedCircle
                                className="mb-3 border border-light border-3"
                                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                            />
                            <h2>{`${userData.firstName} ${userData.lastName}`}</h2>
                            <p className="lead">{userData.description || []}</p>
                            <Button
                                variant="outline-light"
                                size="sm"
                                onClick={() => navigator.share?.({ url: shareProfileUrl, title: `Check out ${userData.firstName}'s profile!` })}
                                disabled={!navigator.share}
                            >
                                <FaShareAlt className="me-2" /> Share This Profile
                            </Button>
                        </div>

                        <hr className="my-4 bg-light" />

                        <section>
                            <h4><FaCode className="me-2" /> Technical Prowess</h4>
                            {userData.skills ? (
                                userData.skills.split(',').map((skill, idx) => {
                                    const level = getSkillLevel(skill.trim());
                                    const progress = level === 'Beginner' ? 30 : level === 'Intermediate' ? 60 : level === 'Advanced' ? 85 : 100;
                                    const variant = level === 'Beginner' ? 'info' : level === 'Intermediate' ? 'warning' : level === 'Advanced' ? 'success' : 'danger';

                                    return (
                                        <div key={idx} className="mb-2">
                                            <Badge bg={variant} className="me-2">{skill.trim()}</Badge>
                                            <small className="text-muted">({level})</small>
                                            <ProgressBar now={progress} variant={variant} label={`${progress}%`} style={{ height: '0.5rem' }} />
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="fst-italic">Skills are yet to be showcased!</p>
                            )}
                        </section>

                        {userData.mentee?.length > 0 && (
                            <section className="mt-4">
                                <h4><BiRocket className="me-2" /> Banging Projects</h4>
                                <ListGroup variant="flush">
                                    {userData.mentee.map((project, index) => (
                                        <ListGroup.Item key={index} className="bg-transparent text-light border-light">
                                            <h5>{project.teamname}</h5>
                                            <p>Team ID: <Badge bg="secondary">{project.teamId}</Badge></p>
                                            <Button variant="outline-light" size="sm">View Project Details</Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </section>
                        )}

                        {userData.achievements?.length > 0 && (
                            <section className="mt-4">
                                <h4><FaAward className="me-2" /> Awesome Achievements</h4>
                                <ListGroup variant="flush">
                                    {userData.achievements.map((achievement, index) => (
                                        <ListGroup.Item key={index} className="bg-transparent text-light border-light">
                                            {achievement}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </section>
                        )}

                        <section className="mt-4">
                            <h4><FaLink className="me-2" /> Connect with this Cool Coder!</h4>
                            <div className="d-flex flex-wrap gap-2">
                                {userData.github_url && (
                                    <Button variant="outline-light" href={userData.github_url} target="_blank">
                                        <FaGithub className="me-1" /> GitHub
                                    </Button>
                                )}
                                {userData.linkedin_url && (
                                    <Button variant="outline-light" href={userData.linkedin_url} target="_blank">
                                        <FaLinkedin className="me-1" /> LinkedIn
                                    </Button>
                                )}
                                {userData.Twitter_url && (
                                    <Button variant="outline-light" href={userData.Twitter_url} target="_blank">
                                        <FaTwitter className="me-1" /> Twitter
                                    </Button>
                                )}
                            </div>
                        </section>

                        <hr className="my-4 bg-light" />

                        <div className="text-light">
                            <p><strong>Organization:</strong> {userData.organization || 'Not Specified'}</p>
                            {userData.USN && <p><strong>USN:</strong> {userData.USN}</p>}
                        </div>

                        <div className="text-center mt-4">
                            <Button variant="danger" onClick={logoutHandler}>Logout</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;

// import React from 'react';
// import { useAuth } from "../provider/AuthProvider";
// import { Container, Row, Col, Image, Button, Badge, ListGroup, Card, ProgressBar } from 'react-bootstrap';
// import { FaGithub, FaLinkedin, FaTwitter, FaShareAlt, FaCode, FaLaptopCode, FaAward, FaLink } from 'react-icons/fa'; // More icons!
// import { BiRocket } from 'react-icons/bi'; // BiRocket for projects
// import { useEffect } from "react";

// const Profile = () => {
//     const { user, logout } = useAuth();
// useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await fetch(`/users/${user.uid}`); // Assuming user.uid is the unique identifier
//                 const userData = await response.json();
//                 console.log('Fetched user data:', userData);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };
//     const logoutHandler = () => {
//         logout();
//     };

//     if (!user) {
//         return <h1>Loading...</h1>;
//     }
    
    

//         if (user.providerData[0]?.providerId === 'google.com') {
//             fetchUserData();
//         }
//     }, [user]);

//     const shareProfileUrl = window.location.href; // Or a specific public profile URL

//     // Function to simulate skill levels 
//     const getSkillLevel = (skill) => {
//         // You might have actual proficiency levels in your user data
//         const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
//         return levels[Math.floor(Math.random() * levels.length)];
//     };

//     // Dummy themed backgrounds 
//     const themedBackgrounds = [
//         'linear-gradient(135deg, #43CBFF 0%, #97F9F7 100%)',
//         'linear-gradient(45deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 98%)',
//         'linear-gradient(to right, #24C6DC, #514A9D)',
//     ];
//     const randomBackground = themedBackgrounds[Math.floor(Math.random() * themedBackgrounds.length)];

//     // Fetch user data from the users collection
    

//     return (
//         <Container className="mt-5">
//             <Row className="justify-content-center">
//                 <Col md={8}>
//                     <Card className="shadow-lg rounded-lg p-4" style={{ background: randomBackground, color: 'white' }}>
//                         <div className="text-center mb-4">
//                             <Image
//                                 src={user.picture || 'https://via.placeholder.com/150/ADD8E6/000000?Text=Cool+Coder'} // Enthusiastic placeholder!
//                                 alt={`${user.firstName} ${user.lastName}`}
//                                 roundedCircle
//                                 className="mb-3 border border-light border-3"
//                                 style={{ width: '120px', height: '120px', objectFit: 'cover' }}
//                             />
//                             <h2 className="font-weight-bold">{`${user.firstName} ${user.lastName}`}</h2>
//                             <p className="lead">{user.description || 'A fantastic tech enthusiast ready to innovate!'}</p>
//                             <Button variant="outline-light" size="sm" onClick={() => navigator.share({ url: shareProfileUrl, title: `Check out the awesome profile of ${user.firstName}!` })} disabled={!navigator.share}>
//                                 <FaShareAlt className="mr-2" /> Share This Cool Profile!
//                             </Button>
//                         </div>

//                         <hr className="my-4 bg-light" />

//                         <div>
//                             <h4 className="text-light"><FaCode className="mr-2" /> Technical Prowess</h4>
//                             {user.skills ? ( // Changed from user.skills && ...
//                                 user.skills.split(',').map((skill, index) => {
//                                     const trimmedSkill = skill.trim();
//                                     const level = getSkillLevel(trimmedSkill);
//                                     const progress = level === 'Beginner' ? 30 : level === 'Intermediate' ? 60 : level === 'Advanced' ? 85 : 100;
//                                     const variant = level === 'Beginner' ? 'info' : level === 'Intermediate' ? 'warning' : level === 'Advanced' ? 'success' : 'danger';
//                                     return (
//                                         <div key={index} className="mb-2">
//                                             <Badge pill variant={variant} className="mr-2">{trimmedSkill}</Badge>
//                                             <small className="text-muted">({level})</small>
//                                             <ProgressBar now={progress} variant={variant} label={`${progress}%`} style={{ height: '0.5rem' }} />
//                                         </div>
//                                     );
//                                 })
//                             ) : (
//                                 <p className="text-light fst-italic">Skills are yet to be showcased!</p>
//                             )}
//                         </div>

//                         {user.mentee && user.mentee.length > 0 && (
//                             <div className="mt-4">
//                                 <h4 className="text-light"><BiRocket className="mr-2" /> Banging Projects</h4>
//                                 <ListGroup variant="flush">
//                                     {user.mentee.map((project, index) => (
//                                         <ListGroup.Item key={index} className="bg-transparent text-light border-light">
//                                             <h5 className="font-weight-bold">{project.teamname}</h5>
//                                             <p className="mb-1">Team ID: <Badge variant="secondary">{project.teamId}</Badge></p>
//                                             {/* You can add more details about the project here if available in your schema */}
//                                             <Button variant="outline-light" size="sm" className="mt-2">View Project Details</Button> {/* Placeholder */}
//                                         </ListGroup.Item>
//                                     ))}
//                                 </ListGroup>
//                             </div>
//                         )}

//                         {user.achievements && user.achievements.length > 0 && (
//                             <div className="mt-4">
//                                 <h4 className="text-light"><FaAward className="mr-2" /> Awesome Achievements</h4>
//                                 <ListGroup variant="flush">
//                                     {user.achievements.map((achievement, index) => (
//                                         <ListGroup.Item key={index} className="bg-transparent text-light border-light">{achievement}</ListGroup.Item>
//                                     ))}
//                                 </ListGroup>
//                             </div>
//                         )}

//                         <div className="mt-4">
//                             <h4 className="text-light"><FaLink className="mr-2" /> Connect with this Cool Coder!</h4>
//                             <div className="d-flex">
//                                 {user.github_url && (
//                                     <Button variant="outline-light" className="mr-2" href={user.github_url} target="_blank" rel="noopener noreferrer">
//                                         <FaGithub size={20} /> GitHub
//                                     </Button>
//                                 )}
//                                 {user.linkedin_url && (
//                                     <Button variant="outline-light" className="mr-2" href={user.linkedin_url} target="_blank" rel="noopener noreferrer">
//                                         <FaLinkedin size={20} /> LinkedIn
//                                     </Button>
//                                 )}
//                                 {user.Twitter_url && (
//                                     <Button variant="outline-light" className="mr-2" href={user.Twitter_url} target="_blank" rel="noopener noreferrer">
//                                         <FaTwitter size={20} /> Twitter
//                                     </Button>
//                                 )}
//                             </div>
//                         </div>

//                         <hr className="my-4 bg-light" />

//                         <div className="mt-3 text-light">
//                             <p className="mb-1"><span className="font-weight-bold">Organization:</span> {user.organization}</p>
//                             {user.USN && <p className="mb-0"><span className="font-weight-bold">USN:</span> {user.USN}</p>}
//                         </div>

//                         <div className="text-center mt-4">
//                             <Button variant="danger" onClick={logoutHandler}>Logout</Button>
//                         </div>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Profile;

// import React from "react";
// import { useAuth } from "../provider/AuthProvider";
// import { Button } from "react-bootstrap";

// const Profile = () => {
//     const { user, logout } = useAuth();

//     const logoutHandler = () => {
//         logout();
//     };

//     if (!user) {
//         return <h1>Loading...</h1>;
//     }

//     return (
//         <>
//             <h1>Welcome {user.firstName}</h1>
//             <button type="submit" onClick={logoutHandler}>
//                 Logout
//             </button>
//             <h4>Complete your profile here click below</h4>
//             <Button onClick={() => window.location.href = '/continueprofile'}>Edit Profile</Button>
//         </>
//     );
// };

// export default Profile;