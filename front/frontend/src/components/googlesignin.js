import React, {useState,useEffect} from 'react';
import { useAuth } from '../provider/AuthProvider';
import { useNavigate,useLocation } from 'react-router-dom';
import { Row,Container,Form,Col,Card,Button } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin,googleLogout } from '@react-oauth/google';
import { getUserRole,clearToken } from './auth';
import axios from 'axios';
const Googlesignin = () => {
//     const [values, setValues] = useState({
//         email: "",
//         password: "",
//         role: "user",
//     });
//     const [user, setUser] = useState([]);
//     const [profile, setProfile] = useState([]);
//     const [role, setRole] = useState([]);

//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => {
//             setUser(codeResponse)
//             console.log(codeResponse)
//         },
//         onError: (error) => console.log("Signin Failed:", error)
//     });

//     useEffect(() => {
//         if(user){
//             axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                 headers: {
//                     Authorization: `Bearer ${user.access_token}`,
//                     Accept: 'application/json'
//                 }
//             })
//             .then((res) => {
//                 setProfile(res.data);
//             })
//             .catch((err) => console.log(err));
//             }
//         },
//         [ user ]);

//         const logOut = () => {
//             googleLogout();
//             setProfile(null);
//         };
            
//     const [submitted, setSubmitted] = useState(false);
//     const [showPassword,setShowPassword] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     useEffect(() => {
//         validate();
//     }, [values]);

//     const validateEmail = () => {
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email) ? "" : "Please enter a valid email";
//   };

//   const validatePassword = (password) => {
//     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
//     return passwordPattern.test(password)
//       ? ""
//       : "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character.";
//   };

//   const validate = () => {
//     let newErrors = {};
//     newErrors.name = values.name.trim() ? "" : "Please enter a name";
//     newErrors.email = values.email.trim() ? validateEmail(values.email) : "Please enter an email";
//     newErrors.password = values.password ? validatePassword(values.password) : "Please enter a password";
//     setErrors(newErrors);
//     return Object.values(newErrors).every((error) => error === ""); //no errors then true
//   }

//     const [valid,setValid] = useState(false);
//     const {signin,error} = useAuth();
//     const {gsignin} = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const redirectPath = location.state?.path || "/profile";

//     const handleInputChange = (event) => {
//         const {name,value} =event.target;
//         setValues((values) => ({
//             ...values,
//             [name]: value,        
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try{
//             await signin(values.email,values.password);
//             if(!error){
//                 setValid(true);
//                 setSubmitted(true);
//                 navigate(redirectPath, {replace:true});
//             }
//         }catch(error){
//             console.error("Sign in error",error);
//         }
//     };

//     useEffect(() => {
//         const userRole = getUserRole();
//         setRole(userRole);
//         console.log("User Role on load:",userRole);
//     },[]);

//     const handleLogout = () => {
//         clearToken();
//         setRole(null);
//     };

// return(
//     <Container>
//         <Form className='register-form' onSubmit={handleSubmit}>
//             {submitted && valid && (
//                 <div>
//                     <h3>Welcome to HackaFest</h3>
//                     <div>You are logged in</div>
//                     <button onClick={() => {handleLogout();}}>Logout</button>
//                 </div>
//             )}
//             {!valid && (
//                 <>
//                 {error && <div className='error-message'>{error}</div>}
//                 <input
//                     className='form-field'
//                     type='email'
//                     placeholder='Email'
//                     name="email"
//                     value={values.email}
//                     onChange={handleInputChange}
//                 />
//                 {submitted && !values.email && (
//                     <span id='error'>Please enter an email address</span>
//                 )}
//                 <input
//                  className='form-field'
//                  type='password'
//                  placeholder='Password'
//                  name='password'
//                  value={values.password}
//                  onChange={handleInputChange}
//                 />
//                 <button className='form-field' type='submit'>Login</button>
//                 </>
//             )}
//             <div style={{ display: "flex", justifyContent: "center" }}>
//         {profile ? (
//           <div className="card">
//             <img src={profile.picture} alt='user image' />
//             <h5>User Logged in</h5>
//             <p>Name: {profile.name}</p>
//             <p>Email: {profile.email}</p>
//             <button onClick={logOut}>Log Out</button>
//             {/* {values.name}=={profile.name}
//             {values.email}=={profile.email} */}
//             </div>
//         ):(
//           <button onClick={login}>Sign in with google</button>
//         )}
//         </div>
//             <p>Don't have an account <a href='/newsignup'>Signup</a></p>
//         </Form>
//     </Container>

    const [role, setRole] = useState(null);

    const initialUserProperties = {
        access_token: '',
        expires_in: 0,
        id_token: '',
        scope: '',
        token_type: '',
    };

    const emailUserProfile = {
        email: '',
        family_name: '',
        given_name: '',
        hd: '',
        id: '',
        locale: '',
        name: '',
        picture: '',
        verified_email: false,
    };

    const [emailUser, setEmailUser] = useState(initialUserProperties);
    const [emailProfile, setEmailProfile] = useState(emailUserProfile);
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/profile";

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setEmailUser(codeResponse);
            console.log(codeResponse);
        },
        onError: (error) => console.log("Login Failed:", error),
    });

    useEffect(() => {
        if (!!emailUser.access_token) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${emailUser.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${emailUser.access_token}`,
                            Accept: 'application/json',
                        },
                    }
                )
                .then((res) => {
                    setEmailProfile(res.data);

                    // Save user data to MongoDB
                    const userData = {
                        name: res.data.name,
                        email: res.data.email,
                        picture: res.data.picture,
                        role: "user",
                    };

                    axios
                        .post("http://localhost:5000/api/auth/googlesignup", userData)
                        .then((response) => {
                            console.log("User data saved to MongoDB:", response.data);
                        })
                        .catch((err) => {
                            console.error("Error saving user data to MongoDB:", err);
                        });
                })
                .catch((err) => console.log('Error fetching user profile:', err));
        }
    }, [emailUser]);


    useEffect(() => {
        const userRole = getUserRole();
        setRole(userRole);
        console.log("user role on load:",userRole);
    },[]);

    const logOut = () => {
        googleLogout();
        setEmailProfile(null);
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Card>
            {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
                {emailProfile ? (
                    <div>
                        <img src={emailProfile.picture} alt="user image" />
                        <h3>The User profile.</h3>

                        <div>
                            <p>Name: {emailProfile.name}</p>
                            <p>Email Address: {emailProfile.email}</p>
                        </div>

                        <br />
                        <button onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <button onClick={() => login()}>Sign in with Google</button>
                )}
            </Card>
        </div>
)};

export default Googlesignin;