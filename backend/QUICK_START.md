# 🚀 Quick Start Guide - TaskFlow Backend

Get the TaskFlow API running in under 5 minutes!

## Prerequisites Checklist

- [ ] Bun installed ([Download](https://bun.sh))
- [ ] PostgreSQL installed and running
- [ ] Database created (or you'll create it in step 2)

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
bun install
```

### Step 2: Configure Database
```bash
# Copy environment template
cp .env.example .env

# Edit .env file and set your DATABASE_URL
# Example: DATABASE_URL="postgresql://postgres:password@localhost:5432/taskflow"
```

### Step 3: Create Database (if needed)
```bash
# Option A: Using createdb command
createdb taskflow

# Option B: Using psql
psql -U postgres
CREATE DATABASE taskflow;
\q
```

### Step 4: Run Migrations
```bash
bun run db:migrate --name init
```

This will:
- Create the `Task` table
- Generate Prisma Client
- Set up your database schema

### Step 5: Start the Server
```bash
bun run dev
```

✅ **Done!** Your API is now running at `http://localhost:3000`

## Test Your API

### Method 1: Open Swagger UI
Visit: http://localhost:3000/swagger

### Method 2: Quick cURL Test
```bash
# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Task", "status": "todo"}'

# Get all tasks
curl http://localhost:3000/tasks
```

### Method 3: Open Prisma Studio
```bash
bun run db:studio
```
Opens at: http://localhost:5555

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run start` | Start production server |
| `bun run db:migrate` | Create new migration |
| `bun run db:generate` | Generate Prisma Client |
| `bun run db:studio` | Open database UI |
| `bun run db:push` | Push schema changes without migration |
| `bun run db:reset` | Reset database (⚠️ deletes data) |

## Common Issues & Solutions

### ❌ "DATABASE_URL environment variable is not set"
**Solution**: Create `.env` file from `.env.example` and add your database URL

### ❌ "Database does not exist"
**Solution**: Create the database using `createdb taskflow`

### ❌ "Cannot find module '@prisma/client'"
**Solution**: Run `bun run db:generate`

### ❌ "Port 3000 already in use"
**Solution**: Edit `src/index.ts` and change `.listen(3000)` to another port

### ❌ "Connection refused to PostgreSQL"
**Solution**: Start PostgreSQL service
- Windows: Check Services → PostgreSQL
- Mac: `brew services start postgresql`
- Linux: `sudo systemctl start postgresql`

## Next Steps

1. ✅ Test all API endpoints in Swagger UI
2. ✅ Create some sample tasks
3. ✅ Explore Prisma Studio to view your data
4. ✅ Build your frontend to connect to the API

## API Endpoints Overview

```
GET    /                      → Health check
GET    /tasks                 → Get all tasks
GET    /tasks/:id             → Get task by ID
GET    /tasks/status/:status  → Filter by status
POST   /tasks                 → Create new task
PUT    /tasks/:id             → Update task
DELETE /tasks/:id             → Delete task
```

## Example Task Object

```json
{
  "id": "clxxx...",
  "title": "Complete TaskFlow project",
  "description": "Build the backend API",
  "status": "in-progress",
  "createdAt": "2025-11-20T10:30:00Z",
  "updatedAt": "2025-11-20T11:00:00Z"
}
```

## Valid Status Values
- `todo` - Not started
- `in-progress` - Currently working on it
- `done` - Completed

---

Need more details? Check the full [README.md](./README.md)

**Happy coding! 🎉**
