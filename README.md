# 🛡️ Users API with Authentication (NestJS + SQLite)

A RESTful API built with **NestJS**, featuring secure **JWT-based authentication**, **role-based access control**, and **SQLite + TypeORM** as the database layer.

---

## 📦 Features

- ✅ User Registration & Login  
- 🔐 JWT Authentication  
- 👮 Role-Based Access Control (`admin`, `user`)  
- 🔒 Protected Routes based on roles  
- 🧂 Password Hashing using bcrypt  
- 🧪 Ready for testing and expansion  

---

## 🧱 Tech Stack

- **NestJS** (Backend Framework)  
- **TypeORM** (ORM)  
- **SQLite** (Database)  
- **JWT** (Authentication)  
- **bcrypt** (Password hashing)  
- **class-validator** (Validation)  

---

## 🚀 Getting Started

### 📁 Clone the Repo

```bash
git clone https://github.com/your-repo/users-api-auth.git
cd users-api-auth
```

### 📦 Install Dependencies

```bash
npm install
```

### ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=your_jwt_expiration_time
```

---

## ⚙️ Scripts

```bash
# Start in development mode
npm run start:dev

# Build and run in production
npm run build
npm start

# Run the admin seeder
npm run seed

```
---

## 🔐 Authentication Endpoints

### Register

```http
POST /auth/register
```

**Body Example:**

```json
{
  "id": 1,
  "username": "person",
  "email": "person@gmail.com",
  "age": 25,
  "password": "securePassword"
}
```

### Login

```http
POST /auth/login
```

**Body Example:**

```json
{
  "email": "person@gmail.com",
  "password": "securePassword"
}
```

**Response:**

```json
{
  "message": "Successfully logged in!",
  "your_token": "JWT_TOKEN_HERE"
}
```

---

## 🔒 Protected Routes

Use the token returned from `/auth/login` in the request header:

```
Authorization: Bearer JWT_TOKEN_HERE
```

### 👑 Admin Only

```http
GET /admin/data
```

Accessible only by users with the `admin` role.

### 🙍 User Only

```http
GET /user/data
```

Accessible only by users with the `user` role.

---

## 🌱 Admin Seeder

Run the following command to seed an admin user:

```bash
npm run seed
```

## 📁 Project Structure

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.utils.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── guards/
│   │   ├── admin.guard.ts
│   │   └── user.guard.ts
│
├── app.controller.ts
├── app.service.ts
├── app.module.ts
├── main.ts

admin.seeder.ts
```
---

## 📄 License

This project is **UNLICENSED** — free for learning and modification.
