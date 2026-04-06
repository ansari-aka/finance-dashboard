# Finance Dashboard Backend

## Objective
This project is a backend system for a finance dashboard with user management, role-based access control, financial record management, and summary analytics.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator

## Features
- User registration and login
- Role-based access control (Viewer, Analyst, Admin)
- CRUD operations for financial records
- Filtering by type, category, and date
- Dashboard summary APIs:
  - Total income
  - Total expenses
  - Net balance
  - Category-wise totals
  - Monthly trends
  - Recent activity
- Input validation
- Error handling
- Secure routes using JWT

## Roles
### Viewer
Can only view dashboard summaries.

### Analyst
Can view financial records and dashboard summaries.

### Admin
Can create, update, delete records and manage users.

## Setup
1. Clone repository
2. Install dependencies:
   npm install
3. Create `.env` file:
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/finance_dashboard
   JWT_SECRET=supersecretkey
4. Start server:
   npm run dev

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Users
- POST /api/users
- GET /api/users
- GET /api/users/:id
- PATCH /api/users/:id
- DELETE /api/users/:id

### Records
- POST /api/records
- GET /api/records
- GET /api/records/:id
- PATCH /api/records/:id
- DELETE /api/records/:id

### Dashboard
- GET /api/dashboard

## Assumptions
- JWT is used for authentication
- MongoDB is used for persistence
- Role permissions are enforced through middleware
- Only active users can access protected routes
