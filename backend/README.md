# TaskFlow Backend API

A modern task management API built with **Bun**, **Elysia.js**, **Prisma**, and **PostgreSQL**.

## 🚀 Features

- ✅ RESTful API for task management (CRUD operations)
- ✅ PostgreSQL database with Prisma ORM
- ✅ Automatic API documentation with Swagger/OpenAPI
- ✅ CORS enabled for frontend integration
- ✅ Type-safe with TypeScript
- ✅ Fast runtime with Bun
- ✅ Modern backend framework with Elysia.js

## 📋 Prerequisites

- [Bun](https://bun.sh) v1.3.1 or higher
- [PostgreSQL](https://www.postgresql.org/) 12 or higher
- Node.js (for some tooling compatibility)

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install dependencies
bun install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and update the `DATABASE_URL`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Example for local PostgreSQL:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskflow"
```

### 3. Set Up Database

Create the database (if not exists):

```bash
# Using psql
createdb taskflow

# Or connect to PostgreSQL and run:
# CREATE DATABASE taskflow;
```

Run Prisma migrations to create tables:

```bash
bunx prisma migrate dev --name init
```

This will:
- Create the database schema
- Generate Prisma Client
- Apply migrations

### 4. Generate Prisma Client

```bash
bunx prisma generate
```

### 5. Run the Server

```bash
# Development mode
bun run src/index.ts

# Or use the shorthand
bun src/index.ts
```

The API will be available at: `http://localhost:3000`

## 📚 API Documentation

Once the server is running, visit the interactive API documentation:

**Swagger UI**: [http://localhost:3000/swagger](http://localhost:3000/swagger)

## 🔗 API Endpoints

### Health Check
- `GET /` - Health check endpoint

### Task Management

#### Get All Tasks
```http
GET /tasks
```
Returns all tasks ordered by creation date (newest first).

**Response:**
```json
{
  "tasks": [
    {
      "id": "clxxx...",
      "title": "Complete project",
      "description": "Finish the TaskFlow implementation",
      "status": "in-progress",
      "createdAt": "2025-11-20T10:30:00Z",
      "updatedAt": "2025-11-20T11:00:00Z"
    }
  ]
}
```

#### Get Task by ID
```http
GET /tasks/:id
```

**Response:**
```json
{
  "task": {
    "id": "clxxx...",
    "title": "Complete project",
    "description": "Finish the TaskFlow implementation",
    "status": "in-progress",
    "createdAt": "2025-11-20T10:30:00Z",
    "updatedAt": "2025-11-20T11:00:00Z"
  }
}
```

#### Get Tasks by Status
```http
GET /tasks/status/:status
```

Valid statuses: `todo`, `in-progress`, `done`

**Response:**
```json
{
  "tasks": [...],
  "count": 5
}
```

#### Create New Task
```http
POST /tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "Optional description",
  "status": "todo"
}
```

**Fields:**
- `title` (required): Task title
- `description` (optional): Task description
- `status` (optional): `todo` | `in-progress` | `done` (default: `todo`)

**Response:**
```json
{
  "task": {
    "id": "clxxx...",
    "title": "New Task",
    "description": "Optional description",
    "status": "todo",
    "createdAt": "2025-11-20T10:30:00Z",
    "updatedAt": "2025-11-20T10:30:00Z"
  }
}
```

#### Update Task
```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "done"
}
```

All fields are optional. Only provided fields will be updated.

**Response:**
```json
{
  "task": {
    "id": "clxxx...",
    "title": "Updated Title",
    "description": "Updated description",
    "status": "done",
    "createdAt": "2025-11-20T10:30:00Z",
    "updatedAt": "2025-11-20T12:00:00Z"
  }
}
```

#### Delete Task
```http
DELETE /tasks/:id
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## 🗃️ Database Schema

### Task Model

| Field       | Type     | Description                           |
|-------------|----------|---------------------------------------|
| id          | String   | Unique identifier (CUID)              |
| title       | String   | Task title (required)                 |
| description | String?  | Task description (optional)           |
| status      | String   | Task status (default: "todo")         |
| createdAt   | DateTime | Creation timestamp                    |
| updatedAt   | DateTime | Last update timestamp                 |

**Valid Status Values:**
- `todo` - Task not started
- `in-progress` - Task in progress
- `done` - Task completed

## 🧰 Development Tools

### Prisma Studio
View and edit your database in a visual UI:

```bash
bunx prisma studio
```

Opens at: `http://localhost:5555`

### Database Migrations

Create a new migration:
```bash
bunx prisma migrate dev --name <migration-name>
```

Apply migrations in production:
```bash
bunx prisma migrate deploy
```

Check migration status:
```bash
bunx prisma migrate status
```

Reset database (⚠️ deletes all data):
```bash
bunx prisma migrate reset
```

### Generate Prisma Client

After schema changes:
```bash
bunx prisma generate
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts       # Main API server with routes
│   └── db.ts          # Prisma client configuration
├── prisma/
│   ├── schema.prisma  # Database schema
│   └── migrations/    # Database migrations
├── prisma.config.ts   # Prisma configuration
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript configuration
├── .env               # Environment variables (create from .env.example)
└── README.md          # This file
```

## 🔧 Tech Stack

- **Runtime**: [Bun](https://bun.sh) - Fast JavaScript runtime
- **Framework**: [Elysia.js](https://elysiajs.com) - Ergonomic web framework
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Robust relational database
- **ORM**: [Prisma](https://www.prisma.io/) - Next-generation ORM
- **API Docs**: [@elysiajs/swagger](https://elysiajs.com/plugins/swagger.html) - OpenAPI documentation
- **Language**: TypeScript - Type-safe JavaScript

## 🧪 Testing the API

You can test the API using:

1. **Swagger UI**: http://localhost:3000/swagger
2. **cURL**:
   ```bash
   # Get all tasks
   curl http://localhost:3000/tasks
   
   # Create a task
   curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Task", "status": "todo"}'
   ```
3. **Postman** or **Insomnia**: Import the OpenAPI spec from `/swagger/json`

## 🚨 Troubleshooting

### Database Connection Issues

1. Ensure PostgreSQL is running:
   ```bash
   pg_isready
   ```

2. Check connection string in `.env`

3. Verify database exists:
   ```bash
   psql -l
   ```

### Prisma Client Issues

If you see "Cannot find module '@prisma/client'":

```bash
bunx prisma generate
```

### Port Already in Use

If port 3000 is busy, modify `src/index.ts`:
```typescript
.listen(3001) // Change to available port
```

## 📝 Notes

- The API uses CUID for task IDs (more URL-friendly than UUID)
- All timestamps are in ISO 8601 format
- CORS is enabled for all origins (configure for production use)
- The API runs on port 3000 by default

## 🤝 Contributing

This is a take-home project for Zodiac Engineering Team.

---

Built with ❤️ using modern web technologies
