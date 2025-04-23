import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/profile";
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token);
            setLoading(false);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            setLoading(false);
        }
    }, [token]);

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

    const logout = () => {
        setToken(null);
        setUser(null);
        navigate("/logino");
    };

    const signout = () => {
        setToken(null);
        setUser(null);
        navigate("/signinuser");
    }

    const contextValue = useMemo(
        () => ({
            user,
            login, // Updated to 'login'
            logout,
            signin,
            token,
            setToken,
            loading,
            error,
        }),
        [user, token, loading, error]
    );

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