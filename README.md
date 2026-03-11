# FOODBRIDGE
Connecting Communities, Combating Food Waste.

FoodBridge is a comprehensive full-stack platform designed to redistribute surplus quality food from donors to acceptors (NGOs/Orphanages) through a network of reliable volunteers.

## Features
- **Role-Based Dashboards**: Tailored experiences for Donors, Volunteers, and Acceptors.
- **Secure Authentication**: JWT-based auth with bcrypt password hashing.
- **Live Donation Feed**: Volunteers can view and accept available food pickups.
- **OTP Verification**: Secure handover of food via Nodemailer OTP.
- **Image Uploads**: Integrated Cloudinary support for food photos.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for a premium, responsive experience.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion, Axios, React Router.
- **Backend**: Node.js, Express.js, MongoDB + Mongoose, JWT.
- **Integrations**: Cloudinary (Images), Nodemailer (Email/OTP).

---

## Local Development Setup

### Prerequisite
Make sure you have Node.js and MongoDB installed on your system.
You will also need a [Cloudinary](https://cloudinary.com/) account and a Gmail account for App Passwords (SMTP).

### 1. Database & Environment Setup
Navigate to the `backend` directory and configure the environment variables:
```bash
cd backend
npm install
```
Edit the `.env` file in the `backend` directory with your actual credentials:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/foodbridge
JWT_SECRET=yoursecretkey
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### 2. Run Backend Server
From the `backend` directory:
```bash
npm start
# or use nodemon if installed globally:
# nodemon server.js
```
The API server will run on `http://localhost:5000`.

### 3. Run Frontend Application
Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The React app will typically run on `http://localhost:5173`.

---

## Deployment
- **Frontend**: Easily deployable to Vercel. Simply connect the GitHub repo and choose the Vite preset.
- **Backend**: Ready for Render or Heroku. Ensure you add all `.env` variables to your hosting provider's dashboard and set up a MongoDB Atlas cluster URI.
