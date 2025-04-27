# 🎓 College Directory Management System

A **full-stack web application** built using **React (Vite) + Tailwind CSS** for the frontend and **Spring Boot** (Java) for the backend. This system helps administrators manage students, faculty, and course information efficiently with **Role-Based Access Control (RBAC)** using **JWT Authentication**.

---

## 🚀 Features

- 🔐 Secure Role-Based Access (Student, Faculty, Admin)
- 🧑‍🎓 Student Profile Management
- 👨‍🏫 Faculty Profile Management
- 📚 Course and Department Management
- 📝 Student Enrollment in Courses
- 📄 RESTful APIs with Spring Boot
- 🌐 Responsive UI with React + Tailwind
- 🔒 JWT-based Authentication System

---

## 🧱 Tech Stack

### Frontend:
- React + Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM

### Backend:
- Spring Boot (Java)
- Spring Security + JWT
- PostgreSQL
- Hibernate / JPA
- Maven

---

## 🗃️ Database Schema

### Entities & Relationships:

- **User** (`id`, `username`, `password`, `role`, `name`, `email`, `phone`)
- **StudentProfile** (1-1 with User) → `user_id`, `photo`, `department_id`, `year`
- **FacultyProfile** (1-1 with User) → `user_id`, `photo`, `department_id`, `office_hours`
- **AdministratorProfile** (1-1 with User) → `user_id`, `photo`, `department_id`
- **Course** → `id`, `title`, `description`, `department_id`, `faculty_id`
- **Enrollment** (Many-to-Many) → `id`, `student_id`, `course_id`
- **Department** → `id`, `name`, `description`

---

## 📁 Project Structure

```
college-directory/
├── backend/
│   ├── src/main/java/com/college/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── security/
│   └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.tsx
│   └── tailwind.config.js
└── README.md
```

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js ≥ 16.x
- Java 17+
- PostgreSQL Server
- Maven
- Postman (for testing APIs)

---

### 🔧 Backend Setup (Spring Boot)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/college-directory.git
   cd college-directory/backend
   ```

2. Update `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/college_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   jwt.secret=your_jwt_secret
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

---

### 🌐 Frontend Setup (React + Vite)

1. Navigate to the frontend:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Environment Variables (`.env`)
   ```env
   VITE_API_BASE_URL=http://localhost:8083/api
   ```

---

## 🔒 Role-Based Access

| Role    | Permissions                                           |
|---------|-------------------------------------------------------|
| Student | View personal data, enrolled courses                 |
| Faculty | View & manage their courses and students             |
| Admin   | Full CRUD on users, departments, and course data     |

JWT token is stored in `localStorage` and sent with all API requests via Axios interceptors.

---

## 🧪 API Testing

Use Postman or any REST client to test APIs. Base URL: `http://localhost:8083/api`

**Authentication:**
- `/auth/register` – Register user
- `/auth/login` – Login and receive JWT

**Protected Routes (require Bearer Token):**
- `/admin/students` – Admin-only
- `/faculty/courses` – Faculty-only
- `/student/enrollments` – Student-only

---

## 📷 Screens 

![loginpage](https://github.com/user-attachments/assets/177543d0-1310-4a40-88c8-9a28fd2ee133)
![admin_student](https://github.com/user-attachments/assets/fb718695-9c94-463c-9c5d-b0f366b449ee)
![admin_faculty](https://github.com/user-attachments/assets/7e61c58e-a5fd-41ea-a6bc-ea9fc20b07db)

---

## 📌 Future Enhancements

- 📊 Dashboard Analytics for Admin
- 📬 Notifications / Messaging
- 📁 Document Upload for Students
- 🧑‍⚖️ Role Editor from UI
- 🌍 Deployment on Render/Vercel + Railway

---

## 🧑‍💻 Author

[@RedWing0021](https://github.com/redwing0021)**[Naitik Patel]**
---

<!--## 📄 License

This project is open-source under the [MIT License](LICENSE).-->
