import React from "react";

const RoleBasedComponent = ({ children, supportedRoles, role, isAuthenticated }) => {
    const authorizedRoles = ["user", "mentor", "organizer"];
    const isAuthorized = authorizedRoles.includes(role) && supportedRoles.includes(role);

    return (
        <div>
            {isAuthenticated && isAuthorized ? children : <h2>Access Denied</h2>}
        </div>
    );
};

export default RoleBasedComponent;