import React from "react";
import { useAuth } from "../provider/AuthProvider";
import { Button } from "react-bootstrap";

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
            <h1>Welcome {user.firstName}</h1>
            <button type="submit" onClick={logoutHandler}>
                Logout
            </button>
            <h4>Complete your profile here click below</h4>
            <Button onClick={() => window.location.href = '/register'}>Edit Profile</Button>
        </>
    );
};

export default Profile;