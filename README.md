IIEST Shibpur - Departmental Achievement Portal

This project is a full-stack MERN (MongoDB, Express, React, Node.js) web application built as a minor project. It serves as a dynamic portal for a university department where users (students, faculty, alumni) can register, log in, and manage a personal dashboard of their achievements and posts.

Features-->

* Secure Authentication: Full user registration and login system built with Passport.js (passport-local-mongoose) using a persistent session-based strategy.

* Role-Based System: User schema includes roles (student, faculty, alumni, staff) to enable future role-based permissions.

* Protected Routes (Frontend & Backend):

* Frontend: Uses a custom ProtectedRoute component in React Router to redirect unauthenticated users to the /login page.

* Backend: Uses isLoggedIn middleware to protect API routes, ensuring only logged-in users can access or modify data.

* CSS and Styling has done by (Bootstrap - React) and (fontawesome)

--> Personal User Dashboard: A complete "Create, Read, Update, Delete" (CRUD) dashboard where logged-in users can:

* View only their own posts.

* Create new posts (achievements, publications, etc.).

* Edit their existing posts via a pop-up modal.

* Delete their posts with a confirmation prompt.
  
-------------------------------------------------------------------------------------------------------------------------------------------------
Getting Started-->

To run this project locally, you will need to run the Backend and Frontend servers in two separate terminals.

Prerequisites

Node.js (v18 or later)

MongoDB Server (Local): You must have MongoDB Community Server installed and running on your local machine.

You can use MongoDB Compass to visually manage your database.  

-------------------------------------------------------------------------------------------------------------------------------------------------

1.BACKEND SETUP-
----------------

 1. Navigate to the backend folder
(cd Backend)

 2. Install all required npm packages
(npm install)

 3. Create the .env file
 Create a new file in the /Backend folder named (.env)


 4. Run the server
 This will start the server on http://localhost:8080
(nodemon server.js)

-------------------------------------------------------------------------------------------------------------------------------------------------

CREATE THIS FILE AT,  Backend/.env
----------------------------------

 This is the secret key for signing your session cookies
(SESSION_SECRET="your_random_secret_string_here")

 This is the connection string for your local MongoDB
(DATABASE_URL="mongodb://127.0.0.1:27017/Achievements")

--------------------------------------------------------------------------------------------------------------------------------------------------

2.FRONTEND SETUP-
----------------

 1. Open a NEW terminal
 (Your backend server must be left running in the first terminal)

 2. Navigate to the frontend folder from the root
(cd Frontend)

 3. Install all required npm packages
(npm install)

 4. Run the frontend development server
 This will start the app on http://localhost:5173
(npm run dev)

--------------------------------------------------------------------------------------------------------------------------------------------------

3. You're All Set!

Your application is now running.

Backend API: http://localhost:8080

Frontend App: http://localhost:5173

You can now open http://localhost:5173 in your browser to use the site.



  
