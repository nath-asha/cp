// import React from "react";

// const Unauthorized = () => {
//     return (
//         <div>
//             <p className="text-black">You do not have permission to view this page.</p>
//         </div>
//     );
// };

// export default Unauthorized;
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>403 - Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <img src='unauthorised.jpg' alt='Unauthorized' style={{ width: '300px', height: '200px' }} /><br></br>
            <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
    );
};

export default Unauthorized;