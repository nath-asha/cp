# cp
# CP Event & Team Management Platform

This project is a full-stack web application for managing coding events, team formation, user registrations, and event challenges. It is built with a React frontend and a Node.js/Express backend, using MongoDB as the database.

---

## Features

- **User Authentication:** Register, login, and manage user profiles.
- **Event Management:** View, register, and manage coding events.
- **Team Management:** Create, join, and manage teams for events.
- **Invitations:** Send and manage team invitations.
- **Challenge Selection:** Teams can choose and submit event challenges.
- **Admin Controls:** (Optional) Admins can manage users, events, and teams.

---

## Tech Stack

- **Frontend:** React, Bootstrap, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- npm

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. **Install backend dependencies:**
    ```bash
    cd cp/backend
    npm install
    ```

3. **Install frontend dependencies:**
    ```bash
    cd ../../cp/front/frontend
    npm install
    ```

4. **Configure environment variables:**
    - Create a `.env` file in `cp/backend` for backend configuration (e.g., MongoDB URI, JWT secret).

5. **Start the backend server:**
    ```bash
    npm start
    ```
    The backend runs on [http://localhost:5000](http://localhost:5000).

6. **Start the frontend:**
    ```bash
    npm start
    ```
    The frontend runs on [http://localhost:3000](http://localhost:3000).

---

## Folder Structure

```
cp/
  backend/
    models/
    routes/
    controllers/
    ...
  front/
    frontend/
      src/
        components/
        ...
```

---

## API Endpoints

- `POST /signup` - Register a new user
- `POST /login` - User login
- `GET /events` - List all events
- `POST /events/:eventId/register` - Register for an event
- `POST /createteams` - Create a new team
- `POST /send-invitation/:teamId` - Send team invitation
- `POST /choose-challenge/:teamId` - Choose a challenge for a team
- ...and more

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.



## Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)