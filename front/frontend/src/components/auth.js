import {jwtDecode} from "jwt-decode";

// Get token from localStorage
export const getToken = () => localStorage.getItem("token");

// Decode token to get user role
export const getUserRole = () => {
    const token = getToken();
    if (token) {
        try {
            const decoded = jwtDecode(token);
            console.log("Decoded role:", decoded.role);
            return decoded.role;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }
    return null;
};

// Decode token to get user ID
export const getUserId = () => {
    const token = getToken();
    if (token) {
        try {
            const decoded = jwtDecode(token);
             console.log("Decoded user ID:", decoded.id);
            return decoded.id; // Assuming the token contains a field named 'id'
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }
    return null;
};

export const getEmail = () => {
    const token = getToken();
    if(token) {
        try{
            const decoded = jwtDecode(token);
            return decoded.email;
        }catch(error){
            console.error("Error decoding token:",error);
            return null;
        }
    }
    return null;
};

// Save token to localStorage
export const setToken = (token) => {
    localStorage.setItem("token", token);
};

// Clear token from localStorage
export const clearToken = () => {
    localStorage.removeItem("token");
};
// import {jwtDecode} from 'jwt-decode';
// const token = localStorage.getItem('token');
// let userRole = null;

// if (token) {
//     const decoded = jwtDecode(token);
//     userRole = decoded.role;
//     console.log("User Role:", userRole);
// }

// export const getUserRole = () => userRole;