import {jwtDecode} from 'jwt-decode';
const token = localStorage.getItem('token');
let userRole = null;

if (token) {
    const decoded = jwtDecode(token);
    userRole = decoded.role;
    console.log("User Role:", userRole);
}

export const getUserRole = () => userRole;