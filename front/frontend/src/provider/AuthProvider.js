import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/profile";
    // const [token, setToken_] = useState(localStorage.getItem("token"));
    const [token, setToken_] = useState(() => localStorage.getItem("token"));

    // const [user, setUser] = useState(null);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    // useEffect(() => {
    //     if (token) {
    //         axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    //         localStorage.setItem("token", token);
    //         setLoading(false);
    //     } else {
    //         delete axios.defaults.headers.common["Authorization"];
    //         localStorage.removeItem("token");
    //         setLoading(false);
    //     }
    // }, [token]);

    useEffect(() => {
        if (user && token) {
            localStorage.setItem("user", JSON.stringify(user));
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token);
            setLoading(false);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setLoading(false);
        }
    }, [user, token]);

    const login = async (email, password) => { // Renamed to 'login'
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            const { token, user } = response.data;
            setToken_(token);
            setUser(response.data.user);
            navigate(redirectPath, { replace: true });
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const signin = async (email, password) => { // Renamed to 'login'
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signinuser", { email, password });
            const { token, user } = response.data;
            setToken_(token);
            setUser(response.data.user);
            navigate(redirectPath, { replace: true });
        } catch (err) {
            console.error("Signin failed:", err);
            setError(err.response?.data?.message || "Signin failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    //this is new google signin there is no password matching
    // const gsignin = async (email, name, accessT) => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const response = await axios.post("http://localhost:5000/api/auth/googlesignin", { email, name, accessT });
    //         setToken_(response.data.token); // <--- Add this
    //         setUser(response.data.user);
    //         navigate(redirectPath, { replace: true });
    //     } catch (err) {
    //         console.error("Google sign in error", err);
    //         setError(err.response?.data?.message || "Google signin failed. Please try again");
    //     } finally {
    //         setLoading(false);
    //     }
    // }; 
    
    const gsignin = async (userOrEmail, passwordOrToken, callback) => {
        try {
            let authenticatedUser = null;
            let jwtToken = null;

            if (typeof userOrEmail === "string" && passwordOrToken) {
                // Email/password login
                const response = await axios.post("http://localhost:5000/api/auth/signin", {
                    email: userOrEmail,
                    password: passwordOrToken,
                });
                authenticatedUser = response.data.user;
                jwtToken = response.data.token;
            } else {
                // Google login: directly pass user & token
                authenticatedUser = userOrEmail;
                jwtToken = passwordOrToken;
            }

            setUser(authenticatedUser);
            setToken(jwtToken);
            setError(null);
            if (callback) callback();
        } catch (err) {
            console.error("Google Sign-In failed:", err);
            setError(err.response?.data?.message || "Authentication failed");
        }
    };
    // const gsignin = async (userOrEmail, passwordOrToken, callback) => {
    //     try {
    //         let authenticatedUser = null;
    //         let jwtToken = null;

    //         if (typeof userOrEmail === "string" && passwordOrToken) {
    //             // Email/password login
    //             const response = await fetch("http://localhost:5000/api/auth/signin", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({ email: userOrEmail, password: passwordOrToken }),
    //             });

    //             const data = await response.json();
    //             if (!response.ok) throw new Error(data.message || "Login failed");

    //             authenticatedUser = data.user;
    //             jwtToken = data.token;
    //         } else {
    //             // Google login: directly pass user & token
    //             authenticatedUser = userOrEmail;
    //             jwtToken = passwordOrToken;
    //         }

    //         setUser(authenticatedUser);
    //         setToken(jwtToken);
    //         setError(null);
    //         if (callback) callback();
    //     } catch (err) {
    //         console.error(err);
    //         setError(err.message || "Authentication failed");
    //     }
    // };

    const logout = () => {
        setToken(null);
        setUser(null);
        // navigate("/logino");
        navigate("/googlesignin");
    };

    const signout = () => {
        setToken(null);
        setUser(null);
        setError(null);
        // navigate("/signinuser");
        navigate("/googlesignin");
        // if (callback) callback();
    }

    const contextValue = useMemo(
        () => ({
            user,
            login, // Updated to 'login'
            logout,
            signin,
            gsignin,
            token,
            setToken,
            loading,
            error,
        }),
        [user, token, loading, error]
    );
    const isAuthenticated = () => !!token;


    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;

// import axios from "axios";
// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   // State to hold the authentication token
//   const [token, setToken_] = useState(localStorage.getItem("token"));

//   // Function to set the authentication token
//   const setToken = (newToken) => {
//     setToken_(newToken);
//   };

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//       localStorage.setItem('token',token);
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//       localStorage.removeItem('token')
//     }
//   }, [token]);

//   // Memoized value of the authentication context
//   const contextValue = useMemo(
//     () => ({
//       token,
//       setToken,
//     }),
//     [token]
//   );

//   // Provide the authentication context to the children components
//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export default AuthProvider;