# Digitize Your Business - CRUD Application

A full-stack Task Management application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js). This project demonstrates secure user authentication and complete CRUD (Create, Read, Update, Delete) operations.

##  Tech Stack
* **Frontend:** React.js (Vite), Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT, Bcrypt

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
```

Create a .env file in the backend folder:

Code snippet
``
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
``

Start the server:

Bash
```
npm run dev
```
2. Frontend Setup
Bash
```
cd frontend
npm install
```
Create a .env file in the frontend folder:

Code snippet
``
VITE_API_URL=http://localhost:5000
``
Start the app:

Bash
```
npm run dev
```

Project Structure
backend/src/models: Mongoose schemas for User and Todo

backend/src/controllers: Logic for Auth and CRUD operations

backend/src/routes: API endpoints (/api/auth, /api/todos)

frontend/src/pages: React components for Login, Register, and Dashboard
