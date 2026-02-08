# HR Management Backend API

A comprehensive HR management REST API built with Node.js, TypeScript, Express, Knex.js, and PostgreSQL.

## 📋 Overview

This is a production-ready HR Management system that allows HR users to:
- Authenticate securely using JWT tokens
- Manage employee records (CRUD operations with photo upload)
- Track daily attendance with automatic upsert functionality
- Generate monthly attendance reports with late arrival tracking (late = check-in after 9:45 AM)
- Search and filter employees with pagination support
- Soft delete employees to maintain data integrity

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [API Usage Examples](#-api-usage-examples)
- [Postman Collection](#-postman-collection)
- [Available Scripts](#-available-scripts)
- [Default Credentials](#-default-credentials)
- [Key Features Explained](#-key-features-explained)
- [Deployment](#-deployment)

## 🚀 Features

- **Authentication**: JWT-based authentication for HR users
- **Employee Management**: CRUD operations with soft delete functionality
- **Attendance Tracking**: Daily attendance with upsert functionality
- **Reporting**: Monthly attendance reports with late tracking
- **File Upload**: Employee photo upload support (Multer + Cloudinary ready)
- **Pagination & Search**: Advanced filtering and pagination
- **Validation**: Zod-based request validation
- **Error Handling**: Centralized error handling with proper HTTP status codes

## 🛠️ Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Query Builder**: Knex.js
- **Authentication**: JWT
- **Validation**: Zod
- **File Upload**: Multer
- **Password Hashing**: bcrypt
- **Development**: ts-node-dev

## 🏗️ Architecture

This project follows **Object-Oriented Programming (OOP)** principles with a clean, modular architecture:

### OOP Implementation
- **Service Layer Classes**: All business logic is encapsulated in service classes
  - `AuthService` - Authentication operations
  - `EmployeeService` - Employee management
  - `AttendanceService` - Attendance tracking
  - `ReportService` - Report generation

- **Singleton Pattern**: Service instances are exported as singletons for efficient resource usage
  ```typescript
  class EmployeeService {
    async createEmployee(payload) { ... }
    async getAllEmployees(filters) { ... }
  }
  export const employeeService = new EmployeeService();
  ```

- **Separation of Concerns**: Clear separation between layers
  - **Controllers**: Handle HTTP requests/responses
  - **Services**: Business logic and database operations
  - **Validation**: Zod schemas for input validation
  - **Middleware**: Cross-cutting concerns (auth, error handling)

- **Encapsulation**: Each service class encapsulates related functionality
- **Single Responsibility**: Each class has one clear purpose
- **Dependency Management**: Services use dependency injection pattern through imports


## 📮 Postman Collection

A complete Postman collection is included in `postman-collection.json` with all API endpoints pre-configured.

### Import to Postman:
1. Open Postman
2. Click **Import** button
3. Select `postman-collection.json` file
4. Collection will be imported with all requests

### Using the Collection:
1. **Run Login first** - This will automatically save the JWT token
2. All other requests will use the saved token automatically
3. For photo uploads, select a file in the `photo` field under Body > form-data

### Collection Features:
- ✅ Auto-saves JWT token after login
- ✅ All endpoints organized by module
- ✅ Pre-filled example data
- ✅ Query parameters with descriptions
- ✅ Both JSON and form-data examples for employee creation
- ✅ Detailed descriptions for each endpoint

### Collection Variables:
- `baseUrl` - API base URL (default: http://localhost:5000/api/v1)
- `token` - JWT token (auto-saved after login)

## 🔐 Default Credentials

After running seeds, you can login with:
- **Email**: admin@hr.com
- **Password**: admin123

## 📤 Response Format

All API responses follow a standardized format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful message",
  "data": {
    // Response data here
  },
  "meta": {
    // Pagination metadata (for list endpoints)
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errorMessages": [
    {
      "path": "field_name",
      "message": "Specific error message"
    }
  ],
  "stack": "Error stack trace (only in development)"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Internal Server Error



## 📁 Project Structure

```
hr-management-backend/
├── src/
│   ├── app/
│   │   ├── errors/              # Custom error classes
│   │   │   ├── AppError.ts      # Base error class
│   │   │   └── handleZodError.ts # Zod validation error handler
│   │   ├── middlewares/         # Express middlewares
│   │   │   ├── auth.ts          # JWT authentication middleware
│   │   │   ├── globalErrorHandler.ts # Centralized error handling
│   │   │   ├── notFound.ts      # 404 handler
│   │   │   └── validateRequest.ts # Zod validation middleware
│   │   ├── modules/             # Feature modules (MVC pattern)
│   │   │   ├── auth/            # Authentication module
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.types.ts
│   │   │   │   └── auth.validation.ts
│   │   │   ├── employees/       # Employee management
│   │   │   │   ├── employee.controller.ts
│   │   │   │   ├── employee.routes.ts
│   │   │   │   ├── employee.service.ts
│   │   │   │   ├── employee.types.ts
│   │   │   │   └── employee.validation.ts
│   │   │   ├── attendance/      # Attendance tracking
│   │   │   │   ├── attendance.controller.ts
│   │   │   │   ├── attendance.routes.ts
│   │   │   │   ├── attendance.service.ts
│   │   │   │   ├── attendance.types.ts
│   │   │   │   └── attendance.validation.ts
│   │   │   └── reports/         # Reporting module
│   │   │       ├── report.controller.ts
│   │   │       ├── report.routes.ts
│   │   │       ├── report.service.ts
│   │   │       ├── report.types.ts
│   │   │       └── report.validation.ts
│   │   └── routes/              # Route aggregation
│   │       └── index.ts
│   ├── config/                  # Configuration files
│   │   ├── db.ts                # Knex database connection
│   │   ├── env.ts               # Environment variables validation
│   │   ├── jwt.ts               # JWT helper functions
│   │   └── multer.ts            # File upload configuration
│   ├── shared/                  # Shared utilities
│   │   ├── catchAsync.ts        # Async error wrapper
│   │   ├── cloudinary.ts        # Cloudinary integration
│   │   ├── paginationHelper.ts  # Pagination utility
│   │   ├── pick.ts              # Object property picker
│   │   └── sendResponse.ts      # Standardized response format
│   ├── types/                   # TypeScript type definitions
│   │   └── express/
│   │       └── index.d.ts       # Express Request augmentation
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server bootstrap
├── migrations/                  # Knex database migrations
│   ├── 20241205000001_create_hr_users_table.ts
│   ├── 20241205000002_create_employees_table.ts
│   └── 20241205000003_create_attendance_table.ts
├── seeds/                       # Database seed files
│   ├── 01_hr_users.ts
│   ├── 02_employees.ts
│   └── 03_attendance.ts
├── uploads/                     # Local file upload directory
├── dist/                        # Compiled JavaScript (after build)
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Environment template
├── knexfile.js                  # Knex configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── package.json                 # Dependencies and scripts
├── postman-collection.json      # Postman API collection
├── vercel.json                  # Vercel deployment config
└── README.md                    # This file
```

## 🚦 Getting Started

### Prerequisites

- Bun (latest version) - [Install Bun](https://bun.sh)
- PostgreSQL database (local or cloud like Neon, Supabase)
- Node.js 18+ (for ts-node-dev)

### Quick Start

```bash
# 1. Clone and install
git clone <repository-url>
cd hr-management-backend
bun install

# 2. Setup environment
cp .env.example .env
# Edit .env with your database credentials

# 3. Setup database
bun run migrate:latest
bun run seed:run

# 4. Start development server
bun run dev

# Server will start at http://localhost:5000
```

### Detailed Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hr-management-backend
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d
   UPLOAD_DIR=uploads
   ```

4. **Database Setup**
   ```bash
   # Run migrations
   bun run migrate:latest
   
   # Run seeds (optional)
   bun run seed:run
   ```

5. **Start the server**
   ```bash
   # Development (using ts-node-dev)
   bun run dev
   
   # Production
   bun run build
   bun start
   ```

## 📊 Database Schema

### HR Users Table
```sql
CREATE TABLE hr_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Employees Table
```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  age INTEGER NOT NULL,
  designation VARCHAR NOT NULL,
  hiring_date DATE NOT NULL,
  date_of_birth DATE NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  photo_path VARCHAR,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Attendance Table
```sql
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  date DATE NOT NULL,
  check_in_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(employee_id, date)
);
```

## 🔗 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | HR user login, returns JWT token | No |

### Employees
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/employees` | Get all employees (pagination, search, filters) | Yes |
| GET | `/employees/:id` | Get single employee by ID | Yes |
| POST | `/employees` | Create new employee (supports photo upload) | Yes |
| PUT | `/employees/:id` | Update employee (supports photo update) | Yes |
| DELETE | `/employees/:id` | Soft delete employee | Yes |

**Query Parameters for GET /employees:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by name or designation (partial match, case-insensitive)
- `designation` - Filter by exact designation
- `sortBy` - Sort field (default: created_at)
- `sortOrder` - Sort direction: asc/desc (default: desc)

### Attendance
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/attendance` | Get attendance records (with filters) | Yes |
| GET | `/attendance/:id` | Get single attendance record | Yes |
| POST | `/attendance` | Create/Update attendance (upsert by employee_id + date) | Yes |
| PUT | `/attendance/:id` | Update attendance record | Yes |
| DELETE | `/attendance/:id` | Delete attendance record | Yes |

**Query Parameters for GET /attendance:**
- `employee_id` - Filter by employee ID
- `from` - Start date (YYYY-MM-DD)
- `to` - End date (YYYY-MM-DD)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: date)
- `sortOrder` - Sort direction: asc/desc (default: desc)

### Reports
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/reports/attendance` | Monthly attendance summary | Yes |

**Query Parameters for GET /reports/attendance:**
- `month` - Required, format: YYYY-MM (e.g., 2024-12)
- `employee_id` - Optional, filter by specific employee

**Response Format:**
```json
{
  "success": true,
  "message": "Monthly attendance report retrieved successfully",
  "data": [
    {
      "employee_id": 1,
      "name": "John Doe",
      "days_present": 22,
      "times_late": 3
    }
  ]
}
```

## 📝 API Usage Examples

### 1. Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hr.com",
    "password": "admin123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "admin@hr.com",
      "name": "Admin User"
    }
  }
}
```

### 2. Create Employee (JSON, no photo)
```bash
curl -X POST http://localhost:5000/api/v1/employees \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 28,
    "designation": "Software Developer",
    "hiring_date": "2024-01-15",
    "date_of_birth": "1995-05-20",
    "salary": 75000
  }'
```

### 3. Create Employee with Photo (multipart/form-data)
```bash
curl -X POST http://localhost:5000/api/v1/employees \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Jane Smith" \
  -F "age=30" \
  -F "designation=HR Manager" \
  -F "hiring_date=2024-02-01" \
  -F "date_of_birth=1993-08-10" \
  -F "salary=80000" \
  -F "photo=@/path/to/photo.jpg"
```

### 4. Get Employees with Search & Pagination
```bash
curl "http://localhost:5000/api/v1/employees?search=john&page=1&limit=10&sortBy=name&sortOrder=asc" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Update Employee
```bash
curl -X PUT http://localhost:5000/api/v1/employees/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "salary": 85000,
    "designation": "Senior Developer"
  }'
```

### 6. Record Attendance (Upsert)
```bash
curl -X POST http://localhost:5000/api/v1/attendance \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": 1,
    "date": "2024-12-05",
    "check_in_time": "09:30:00"
  }'
```

**Note:** If attendance for this employee and date already exists, it will update the check_in_time.

### 7. Get Attendance with Filters
```bash
curl "http://localhost:5000/api/v1/attendance?employee_id=1&from=2024-12-01&to=2024-12-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 8. Get Monthly Attendance Report
```bash
curl "http://localhost:5000/api/v1/reports/attendance?month=2024-12" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "message": "Monthly attendance report retrieved successfully",
  "data": [
    {
      "employee_id": 1,
      "name": "John Doe",
      "days_present": 22,
      "times_late": 3
    },
    {
      "employee_id": 2,
      "name": "Jane Smith",
      "days_present": 20,
      "times_late": 1
    }
  ]
}
```

### 9. Get Report for Specific Employee
```bash
curl "http://localhost:5000/api/v1/reports/attendance?month=2024-12&employee_id=1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔧 Available Scripts

- `bun run dev` - Start development server with hot reload using ts-node-dev
- `bun run build` - Build TypeScript to JavaScript
- `bun start` - Start production server from built files
- `bun run lint` - Run ESLint on source code
- `bun run lint:fix` - Fix ESLint issues automatically
- `bun run migrate:latest` - Run database migrations
- `bun run migrate:rollback` - Rollback migrations
- `bun run seed:run` - Run database seeds


## 🌟 Key Features Explained

### Soft Delete
Employees are soft deleted using the `deleted_at` timestamp. Soft deleted employees are excluded from all queries by default.

### Upsert Attendance
The attendance endpoint supports upsert functionality - if an attendance record exists for the same employee and date, it updates the check-in time.

### Late Tracking
Employees are considered late if their check-in time is after 09:45:00.

### File Upload
Employee photos can be uploaded using multipart/form-data. The system supports both local storage and Cloudinary (buffer mode for Vercel compatibility).

### Pagination
All list endpoints support pagination with `page`, `limit`, `sortBy`, and `sortOrder` parameters.

## 🚀 Deployment

The application is ready for deployment on Vercel or any Node.js hosting service. Make sure to:

1. Set environment variables
2. Run migrations on your production database
3. Configure file upload strategy (local vs Cloudinary)

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Run migrations on production database
```

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
bun run dev
# Check console for "🛢️ Database connected successfully"
```

### Migration Errors
```bash
# Rollback and re-run migrations
bun run migrate:rollback
bun run migrate:latest
```

### Port Already in Use
```env
# Change PORT in .env file
PORT=3000
```

### TypeScript Build Errors
```bash
# Clean build and rebuild
rm -rf dist
bun run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

For detailed API documentation, import the `postman-collection.json` file into Postman or use the examples in this README.

## 🔒 Security Notes

- Never commit `.env` file to version control
- Use strong JWT secrets in production
- Implement rate limiting for production
- Use HTTPS in production
- Regularly update dependencies
- Implement proper CORS configuration

## 📄 License

MIT License