import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from './auth';
import { useAuth } from '../provider/AuthProvider';

const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = getUserRole();

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

// const PrivateRoute = () => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   return isAuthenticated() ? (
//       <Outlet />
//   ) : (
//       <Navigate to="/login" replace state={{ path: location.pathname }} />
//   );
// };

export default PrivateRoute;
// import React from 'react';
// import { Route,redirect } from 'react-router-dom';
// import { getUserRole } from './auth';

// const PrivateRoute = ({ component: Component, allowedRoles, ...rest}) => {
//     const userRole = getUserRole();

//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 allowedRoles.includes(userRole) ? (
//                     <Component {...props} />
//                 ) : (
//                     <redirect to="/unauthorized" />
//                 )
//             }
//         />
//     );
// };

// export default PrivateRoute;