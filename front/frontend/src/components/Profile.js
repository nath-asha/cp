import React from "react";
import { useAuth } from "../provider/AuthProvider";

const Profile = () => {
    const { user, logout } = useAuth();

    const logoutHandler = () => {
        logout();
    };

    if (!user) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <h1>Welcome {user.email}</h1>
            <button type="submit" onClick={logoutHandler}>
                Logout
            </button>
        </>
    );
};

export default Profile;