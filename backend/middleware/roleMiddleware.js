const checkRole = (role,action) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming role is added to req.user via JWT
        const permissions = roles[userRole].can;
    
        if (permissions.includes(action)) {
          next(); // User has permission, proceed
        } else {
          res.status(403).json({ message: "Access Denied" });
        }
      };
    };
    
module.exports = checkRole;

// const roles = {
//   admin: { can: ['create', 'read', 'update', 'delete'] },
//   mentor: { can: ['create', 'read', 'update'] },
//   organizer: { can: ['create', 'read', 'update'] },
//   user: { can: ['read'] },
// };

// const checkRole = (role, action) => {
//   return (req, res, next) => {
//     const userRole = req.user.role; // Assuming role is added to req.user via JWT
//     const permissions = roles[userRole]?.can;

//     if (permissions && permissions.includes(action)) {
//       next(); // User has permission, proceed
//     } else {
//       res.status(403).json({ message: "Access Denied" });
//     }
//   };
// };

// module.exports = checkRole;