export const getAuthToken = () => localStorage.getItem("token");

export const isAuthenticated = () => {
    const token = getAuthToken();
    return token !== null; // Check if token exists
};
