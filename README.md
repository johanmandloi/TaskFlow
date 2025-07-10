# TaskFlow – Collaborative Project Management API

TaskFlow is a backend-only RESTful API built using Node.js, Express.js, and MySQL. It allows teams to manage projects, tasks, members, comments, and view basic analytics. This API is designed to support a scalable project management platform, suitable for internal tools or integration with frontend and mobile applications.

---

## 📦 Features

- Project creation and listing
- Task management with assignment
- Comment system for task discussion
- Project member assignment
- Analytics: total/completed/pending tasks
- Clean and consistent RESTful design
- Built using modular controllers and routers

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MySQL
- dotenv
- nodemon (for development)
- Postman (for API testing)

---

## 📁 Folder Structure



taskflow-api/
├── app.js
├── .env
├── package.json
├── controllers/
│   ├── projectController.js
│   ├── taskController.js
│   └── userController.js
├── routes/
│   ├── projectRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── db/
│   └── db.js
├── migrations/
│   └── schema.sql
├── sample\_data/
│   └── insert\_sample.sql
└── .gitignore

`

---

## 🔧 Setup Instructions

### 1. Clone the repository

bash
git clone https://github.com/johanmandloi/TaskFlow.git
cd taskflow-api
`

### 2. Install dependencies

bash
npm install


### 3. Configure environment variables

Create a .env file in the root:


PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=taskflow_db


### 4. Set up the MySQL database

* Run schema.sql inside /migrations to create tables
* (Optional) Run insert\_sample.sql inside /sample\_data to populate dummy data

### 5. Start the server

bash
npm start


---

## 📮 API Endpoints

### Users

| Method | Endpoint                           | Description                     |
| ------ | ---------------------------------- | ------------------------------- |
| GET    | /users                      | Get all users                   |
| POST   | /users                      | Create a new user               |
| GET    | /users/project/\:id/members | Get users assigned to a project |

### Projects

| Method | Endpoint                        | Description                 |
| ------ | ------------------------------- | --------------------------- |
| GET    | /projects                | Get all projects            |
| GET    | /projects/\:id           | Get a specific project      |
| POST   | /projects                | Create a new project        |
| GET    | /projects/\:id/analytics | Get analytics for a project |

### Tasks

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| GET    | /tasks/\:id          | Get task details            |
| POST   | /tasks               | Create a new task           |
| GET    | /tasks/\:id/comments | Get all comments for a task |
| POST   | /tasks/\:id/comments | Add a comment to a task     |

---

## 🧪 Testing the API

Use Postman or Thunder Client in VS Code to test the endpoints:

1. Start the server: npm start
2. Send requests to: http://localhost:3000/...
3. Use Content-Type: application/json for POST requests

Example POST body for creating a user:

json
{
  "name": "Alice",
  "email": "alice@example.com"
}


---

## 📌 Notes

* Project member assignment is done manually via SQL (or you can build a dedicated endpoint).
* This backend is versioned (/) for scalability.
* No authentication system is included in this version.
* Designed to be extended into full-stack or mobile projects.

---

## 📱 Mobile-Optimized API Responses

To support efficient data loading on mobile and low-bandwidth clients, the following endpoints accept a ?compact=true query parameter. This returns lightweight, trimmed-down responses with only the most essential fields.

---

### 🔹 GET /projects?compact=true

*Purpose:* Fetch a lightweight list of all projects.

*Sample Response:*

> {
>   "data": [
>     { "id": 1, "name": "Marketing Site Redesign" },
>     { "id": 2, "name": "Mobile App v2" }
>   ]
> }


---

*Author:* johanmandloi
