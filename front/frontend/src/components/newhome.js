// import React, { useState, useEffect, useRef } from 'react';
// import { User, Users, Calendar, Group, ArrowRight, Code, Trophy, Zap, Star, Rocket } from 'lucide-react';

// const HackaFestHome = () => {
//     const [stats, setStats] = useState({ participants: 1247, problems: 89, submissions: 432 });
//     const [events, setEvents] = useState([
//         { eventId: 1, title: "AI Innovation Challenge", imgUrl: "/api/placeholder/300/200" },
//         { eventId: 2, title: "Blockchain Builders", imgUrl: "/api/placeholder/300/200" },
//         { eventId: 3, title: "Green Tech Hackathon", imgUrl: "/api/placeholder/300/200" }
//     ]);
//     const [currentEventIndex, setCurrentEventIndex] = useState(0);
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//     const [isVisible, setIsVisible] = useState({});
//     const heroRef = useRef(null);

//     useEffect(() => {
//         const handleMouseMove = (e) => {
//             setMousePosition({ x: e.clientX, y: e.clientY });
//         };
        
//         window.addEventListener('mousemove', handleMouseMove);
        
//         // Carousel auto-play
//         const interval = setInterval(() => {
//             setCurrentEventIndex((prev) => (prev + 1) % events.length);
//         }, 4000);

//         // Intersection Observer for animations
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
//                     }
//                 });
//             },
//             { threshold: 0.1 }
//         );

//         document.querySelectorAll('[id]').forEach((el) => {
//             if (el.id) observer.observe(el);
//         });

//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//             clearInterval(interval);
//             observer.disconnect();
//         };
//     }, [events.length]);

//     const CountUp = ({ end, duration = 2000 }) => {
//         const [count, setCount] = useState(0);
        
//         useEffect(() => {
//             let start = 0;
//             const increment = end / (duration / 16);
//             const timer = setInterval(() => {
//                 start += increment;
//                 if (start >= end) {
//                     setCount(end);
//                     clearInterval(timer);
//                 } else {
//                     setCount(Math.floor(start));
//                 }
//             }, 16);
            
//             return () => clearInterval(timer);
//         }, [end, duration]);
        
//         return <span>{count}</span>;
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
//             {/* Animated Background Elements */}
//             <div className="fixed inset-0 overflow-hidden pointer-events-none">
//                 <div 
//                     className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
//                     style={{
//                         left: mousePosition.x / 10,
//                         top: mousePosition.y / 10,
//                         transform: 'translate(-50%, -50%)'
//                     }}
//                 />
//                 <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }} />
//                 <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
//             </div>

//             {/* Hero Section */}
//             <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6">
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-slate-900/40" />
                
//                 <div className="relative z-10 text-center max-w-6xl mx-auto">
//                     <div className="mb-8 animate-fade-in">
//                         <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-6">
//                             <Zap className="w-4 h-4 mr-2 text-yellow-400" />
//                             <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
//                                 Next-Gen Hackathon Platform
//                             </span>
//                         </div>
//                     </div>

//                     <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
//                         <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
//                             HackaFest
//                         </span>
//                         <br />
//                         <span className="text-3xl md:text-5xl font-light text-gray-300">
//                             Ignite Innovation, Build the Future
//                         </span>
//                     </h1>

//                     <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
//                         The ultimate digital hackathon experience. Connect, collaborate, and create 
//                         <span className="text-purple-400 font-semibold"> extraordinary solutions</span> from anywhere in the world.
//                     </p>

//                     <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//                         <button 
//                             className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
//                             <div className="relative flex items-center">
//                                 Explore Events
//                                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                             </div>
//                         </button>
                        
//                         <button 
//                             className="group px-8 py-4 border-2 border-purple-400/50 rounded-2xl font-bold text-lg transition-all duration-300 hover:border-purple-400 hover:bg-purple-400/10 hover:scale-105 cursor-pointer"
//                         >
//                             <div className="flex items-center">
//                                 Get Started
//                                 <Rocket className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
//                             </div>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Floating Elements */}
//                 <div className="absolute top-1/4 left-10 animate-float">
//                     <Code className="w-8 h-8 text-purple-400/60" />
//                 </div>
//                 <div className="absolute top-1/3 right-10 animate-float" style={{ animationDelay: '1s' }}>
//                     <Star className="w-6 h-6 text-pink-400/60" />
//                 </div>
//                 <div className="absolute bottom-1/3 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
//                     <Trophy className="w-7 h-7 text-yellow-400/60" />
//                 </div>
//             </section>

//             {/* Stats Section */}
//             <section id="stats" className={`py-20 px-6 transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                 <div className="max-w-6xl mx-auto">
//                     <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                         Platform Impact
//                     </h2>
//                     <div className="grid md:grid-cols-3 gap-8">
//                         {[
//                             { value: stats.participants, label: 'Active Hackers', icon: Users, color: 'from-purple-500 to-purple-700' },
//                             { value: stats.problems, label: 'Challenges', icon: Code, color: 'from-pink-500 to-pink-700' },
//                             { value: stats.submissions, label: 'Projects Built', icon: Trophy, color: 'from-emerald-500 to-emerald-700' }
//                         ].map((stat, index) => (
//                             <div key={index} className="group relative">
//                                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur backdrop-blur-sm" />
//                                 <div className="relative p-8 text-center hover:scale-105 transition-all duration-500">
//                                     <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-6`}>
//                                         <stat.icon className="w-8 h-8 text-white" />
//                                     </div>
//                                     <h3 className="text-4xl md:text-5xl font-black mb-4 text-white">
//                                         <CountUp end={stat.value} />+
//                                     </h3>
//                                     <p className="text-gray-300 text-lg font-medium">{stat.label}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* How It Works Section */}
//             <section id="how-it-works" className={`py-20 px-6 transition-all duration-1000 delay-200 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                 <div className="max-w-6xl mx-auto">
//                     <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                         Your Journey to Innovation
//                     </h2>
//                     <div className="grid md:grid-cols-4 gap-8">
//                         {[
//                             { step: '01', title: 'Register', desc: 'Create your profile and join our community of innovators' },
//                             { step: '02', title: 'Discover', desc: 'Explore cutting-edge hackathons tailored to your interests' },
//                             { step: '03', title: 'Connect', desc: 'Form dream teams or join existing powerhouse groups' },
//                             { step: '04', title: 'Create', desc: 'Build revolutionary solutions and compete for glory' }
//                         ].map((item, index) => (
//                             <div key={index} className="group relative">
//                                 <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
//                                 <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 group-hover:scale-105">
//                                     <div className="text-6xl font-black text-purple-400/30 mb-4">{item.step}</div>
//                                     <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
//                                     <p className="text-gray-300 leading-relaxed">{item.desc}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Event Slideshow Section */}
//             <section id="events" className={`py-20 px-6 transition-all duration-1000 delay-300 ${isVisible.events ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                 <div className="max-w-6xl mx-auto">
//                     <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                         Upcoming Challenges
//                     </h2>
//                     <div className="relative overflow-hidden rounded-3xl">
//                         <div 
//                             className="flex transition-transform duration-500 ease-in-out"
//                             style={{ transform: `translateX(-${currentEventIndex * 100}%)` }}
//                         >
//                             {events.map((event, index) => (
//                                 <div key={index} className="w-full flex-shrink-0 relative">
//                                     <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-12 text-center backdrop-blur-sm">
//                                         <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
//                                             <Code className="w-16 h-16 text-white" />
//                                         </div>
//                                         <h3 className="text-3xl font-bold text-white mb-4">{event.title}</h3>
//                                         <button 
//                                             className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer"
//                                         >
//                                             Learn More
//                                             <ArrowRight className="ml-2 w-4 h-4" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
                        
//                         {/* Carousel Indicators */}
//                         <div className="flex justify-center mt-8 space-x-2">
//                             {events.map((_, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => setCurrentEventIndex(index)}
//                                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                                         index === currentEventIndex 
//                                             ? 'bg-purple-400 scale-125' 
//                                             : 'bg-gray-600 hover:bg-gray-500'
//                                     }`}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Features Section */}
//             <section id="features" className={`py-20 px-6 transition-all duration-1000 delay-400 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                 <div className="max-w-6xl mx-auto">
//                     <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                         Powerful Features
//                     </h2>
//                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                         {[
//                             { icon: User, title: 'Lightning Registration', desc: 'Get started in seconds with our streamlined onboarding', color: 'from-purple-500 to-purple-700' },
//                             { icon: Users, title: 'Smart Team Matching', desc: 'AI-powered team formation based on skills and interests', color: 'from-pink-500 to-pink-700' },
//                             { icon: Calendar, title: 'Curated Events', desc: 'Discover hackathons perfectly matched to your expertise', color: 'from-emerald-500 to-emerald-700' },
//                             { icon: Group, title: 'Real-time Collaboration', desc: 'Stay connected with integrated chat and video tools', color: 'from-blue-500 to-blue-700' }
//                         ].map((feature, index) => (
//                             <div key={index} className="group relative">
//                                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur backdrop-blur-sm" />
//                                 <div className="relative p-8 text-center hover:scale-105 transition-all duration-500">
//                                     <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}>
//                                         <feature.icon className="w-8 h-8 text-white" />
//                                     </div>
//                                     <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
//                                     <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Call to Action Section */}
//             <section className="py-32 px-6 text-center">
//                 <div className="max-w-4xl mx-auto">
//                     <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
//                         <div className="relative p-12 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
//                             <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                                 Ready to Change the World?
//                             </h2>
//                             <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
//                                 Join thousands of innovators who are already building the future. Your next breakthrough is just one hackathon away.
//                             </p>
//                             <button 
//                                 className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer"
//                             >
//                                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
//                                 <div className="relative flex items-center">
//                                     Start Your Journey
//                                     <Rocket className="ml-3 w-6 h-6 group-hover:translate-y-1 transition-transform" />
//                                 </div>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <style jsx>{`
//                 @keyframes gradient-x {
//                     0%, 100% { background-size: 200% 200%; background-position: left center; }
//                     50% { background-size: 200% 200%; background-position: right center; }
//                 }
                
//                 @keyframes float {
//                     0%, 100% { transform: translateY(0px); }
//                     50% { transform: translateY(-20px); }
//                 }
                
//                 @keyframes fade-in {
//                     from { opacity: 0; transform: translateY(30px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
                
//                 .animate-gradient-x {
//                     animation: gradient-x 4s ease infinite;
//                 }
                
//                 .animate-float {
//                     animation: float 6s ease-in-out infinite;
//                 }
                
//                 .animate-fade-in {
//                     animation: fade-in 1s ease-out;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default HackaFestHome;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { User, Users, Calendar, Group, ArrowRight, Code, Trophy, Zap, Star, Rocket } from 'lucide-react';

const HackaFestHome = () => {
    const [stats, setStats] = useState({ participants: 0, problems: 0, submissions: 0 });
    const [events, setEvents] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState({});
    const heroRef = useRef(null);

    useEffect(() => {
        // Fetch stats from API
        axios.get("http://localhost:5000/api/stats")
            .then(response => setStats(response.data))
            .catch(error => {
                console.error(error);
                // Fallback data if API fails
                setStats({ participants: 1247, problems: 89, submissions: 432 });
            });

        // Fetch events from API
        axios.get("http://localhost:5000/events")
            .then(response => setEvents(response.data))
            .catch(error => {
                console.error(error);
                // Fallback data if API fails
                setEvents([
                    { eventId: 1, title: "AI Innovation Challenge", imgUrl: "/api/placeholder/300/200" },
                    { eventId: 2, title: "Blockchain Builders", imgUrl: "/api/placeholder/300/200" },
                    { eventId: 3, title: "Green Tech Hackathon", imgUrl: "/api/placeholder/300/200" }
                ]);
            });

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        // Carousel auto-play
        const interval = setInterval(() => {
            setCurrentEventIndex((prev) => (prev + 1) % Math.max(events.length, 1));
        }, 4000);

        // Intersection Observer for animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[id]').forEach((el) => {
            if (el.id) observer.observe(el);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
            observer.disconnect();
        };
    }, [events.length]);

    const CountUp = ({ end, duration = 2000 }) => {
        const [count, setCount] = useState(0);
        
        useEffect(() => {
            let start = 0;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            
            return () => clearInterval(timer);
        }, [end, duration]);
        
        return <span>{count}</span>;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div 
                    className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
                    style={{
                        left: mousePosition.x / 10,
                        top: mousePosition.y / 10,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
                <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }} />
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-slate-900/40" />
                
                <div className="relative z-10 text-center max-w-6xl mx-auto">
                    <div className="mb-8 animate-fade-in">
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-6">
                            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                            <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                                Next-Gen Hackathon Platform
                            </span>
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                            HackaFest
                        </span>
                        <br />
                        <span className="text-3xl md:text-5xl font-light text-gray-300">
                            Ignite Innovation, Build the Future
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        The ultimate digital hackathon experience. Connect, collaborate, and create 
                        <span className="text-purple-400 font-semibold"> extraordinary solutions</span> from anywhere in the world.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link 
                            to="/events"
                            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-center">
                                Explore Events
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                        
                        <Link 
                            to="/register"
                            className="group px-8 py-4 border-2 border-purple-400/50 rounded-2xl font-bold text-lg transition-all duration-300 hover:border-purple-400 hover:bg-purple-400/10 hover:scale-105 cursor-pointer"
                        >
                            <div className="flex items-center">
                                Get Started
                                <Rocket className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-10 animate-float">
                    <Code className="w-8 h-8 text-purple-400/60" />
                </div>
                <div className="absolute top-1/3 right-10 animate-float" style={{ animationDelay: '1s' }}>
                    <Star className="w-6 h-6 text-pink-400/60" />
                </div>
                <div className="absolute bottom-1/3 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
                    <Trophy className="w-7 h-7 text-yellow-400/60" />
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className={`py-20 px-6 transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Platform Impact
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { value: stats.participants, label: 'Active Hackers', icon: Users, color: 'from-purple-500 to-purple-700' },
                            { value: stats.problems, label: 'Challenges', icon: Code, color: 'from-pink-500 to-pink-700' },
                            { value: stats.submissions, label: 'Projects Built', icon: Trophy, color: 'from-emerald-500 to-emerald-700' }
                        ].map((stat, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur backdrop-blur-sm" />
                                <div className="relative p-8 text-center hover:scale-105 transition-all duration-500">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-6`}>
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-black mb-4 text-white">
                                        <CountUp end={stat.value} />+
                                    </h3>
                                    <p className="text-gray-300 text-lg font-medium">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className={`py-20 px-6 transition-all duration-1000 delay-200 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Your Journey to Innovation
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Register', desc: 'Create your profile and join our community of innovators' },
                            { step: '02', title: 'Discover', desc: 'Explore cutting-edge hackathons tailored to your interests' },
                            { step: '03', title: 'Connect', desc: 'Form dream teams or join existing powerhouse groups' },
                            { step: '04', title: 'Create', desc: 'Build revolutionary solutions and compete for glory' }
                        ].map((item, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                                <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 group-hover:scale-105">
                                    <div className="text-6xl font-black text-purple-400/30 mb-4">{item.step}</div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Slideshow Section */}
            <section id="events" className={`py-20 px-6 transition-all duration-1000 delay-300 ${isVisible.events ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Upcoming Challenges
                    </h2>
                    <div className="relative overflow-hidden rounded-3xl">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentEventIndex * 100}%)` }}
                        >
                            {events.map((event, index) => (
                                <div key={index} className="w-full flex-shrink-0 relative">
                                    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-12 text-center backdrop-blur-sm">
                                        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center overflow-hidden">
                                            {event.imgUrl ? (
                                                <img 
                                                    src={event.imgUrl} 
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Code className="w-16 h-16 text-white" />
                                            )}
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-4">{event.title}</h3>
                                        <a 
                                            href={`/displayevent/${event.eventId}`}
                                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer"
                                        >
                                            Know More
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Carousel Indicators */}
                        <div className="flex justify-center mt-8 space-x-2">
                            {events.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentEventIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentEventIndex 
                                            ? 'bg-purple-400 scale-125' 
                                            : 'bg-gray-600 hover:bg-gray-500'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className={`py-20 px-6 transition-all duration-1000 delay-400 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Powerful Features
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: User, title: 'Lightning Registration', desc: 'Get started in seconds with our streamlined onboarding', color: 'from-purple-500 to-purple-700' },
                            { icon: Users, title: 'Smart Team Matching', desc: 'AI-powered team formation based on skills and interests', color: 'from-pink-500 to-pink-700' },
                            { icon: Calendar, title: 'Curated Events', desc: 'Discover hackathons perfectly matched to your expertise', color: 'from-emerald-500 to-emerald-700' },
                            { icon: Group, title: 'Real-time Collaboration', desc: 'Stay connected with integrated chat and video tools', color: 'from-blue-500 to-blue-700' }
                        ].map((feature, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur backdrop-blur-sm" />
                                <div className="relative p-8 text-center hover:scale-105 transition-all duration-500">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
                        <div className="relative p-12 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Ready to Change the World?
                            </h2>
                            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                                Join thousands of innovators who are already building the future. Your next breakthrough is just one hackathon away.
                            </p>
                            <Link 
                                to="/register"
                                className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex items-center">
                                    Start Your Journey
                                    <Rocket className="ml-3 w-6 h-6 group-hover:translate-y-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes gradient-x {
                    0%, 100% { background-size: 200% 200%; background-position: left center; }
                    50% { background-size: 200% 200%; background-position: right center; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-gradient-x {
                    animation: gradient-x 4s ease infinite;
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
            `}</style>
        </div>
    );
};

export default HackaFestHome;