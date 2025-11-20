# TaskFlow - Task Management API & Dashboard

A minimal task management system built with modern technologies featuring a RESTful API and interactive dashboard with drag-and-drop functionality.

## 🛠️ Tech Stack

### Backend
- **Runtime**: Bun
- **Framework**: Elysia.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Drag & Drop**: @dnd-kit
- **HTTP Client**: Fetch API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh) (v1.0.0 or higher)
- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Node.js](https://nodejs.org/) (v18 or higher, for frontend)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/rifqiadhis/taskflow.git
cd taskflow
```

### 2. Setup PostgreSQL Database with Docker

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

This will:
- Create a PostgreSQL 16 container named `taskflow_postgres`
- Expose PostgreSQL on port `5432`
- Create a database named `taskflow`
- Set up persistent storage using Docker volumes

**Database Credentials:**
- Host: `localhost`
- Port: `5432`
- Database: `taskflow`
- User: `postgres`
- Password: `password`

**Useful Docker Commands:**

```bash
# Stop the database
docker-compose down

# Stop and remove volumes (deletes all data)
docker-compose down -v

# View logs
docker-compose logs -f postgres

# Check container status
docker ps
```

### 3. Setup Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
bun install
```

Create a `.env` file in the `backend` directory:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskflow"
```

Run Prisma migrations to set up the database schema:

```bash
bun run db:migrate
```

(Optional) Seed the database with sample data:

```bash
bun run db:seed
```

Start the backend server:

```bash
bun run dev
```

The API will be available at `http://localhost:3000`

### 4. Setup Frontend

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory (if needed):

```bash
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Interactive API Documentation
Once the backend is running, access the Swagger documentation at:
```
http://localhost:3000/swagger
```

### Endpoints

#### Get All Tasks
```
GET /tasks
```

**Response:**
```json
[
  {
    "id": "clxxx...",
    "title": "Task Title",
    "description": "Task description",
    "status": "todo",
    "createdAt": "2025-11-20T00:00:00.000Z",
    "updatedAt": "2025-11-20T00:00:00.000Z"
  }
]
```

#### Get Task by ID
```
GET /tasks/:id
```

#### Create Task
```
POST /tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "todo"
}
```

#### Update Task
```
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "in-progress"
}
```

#### Delete Task
```
DELETE /tasks/:id
```

### Task Status Values
- `todo` - Task is pending
- `in-progress` - Task is being worked on
- `done` - Task is completed

## 🗄️ Database Management

### Prisma Commands

```bash
# Generate Prisma Client
bun run db:generate

# Create a new migration
bun run db:migrate

# Deploy migrations (production)
bun run db:migrate:deploy

# Reset database (deletes all data)
bun run db:reset

# Push schema changes without migration
bun run db:push

# Open Prisma Studio (GUI for database)
bun run db:studio

# Run seed script
bun run db:seed
```

### Prisma Studio

To visually inspect and edit your database:

```bash
cd backend
bun run db:studio
```

This opens a browser-based GUI at `http://localhost:5555`

## 🎨 Frontend Features

- **Kanban Board**: Drag-and-drop task management interface
- **Task Columns**: Todo, In Progress, Done
- **Task Operations**: Create, Read, Update, Delete tasks
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Automatic task status updates

## 📁 Project Structure

```
task-management/
├── docker-compose.yml          # Docker PostgreSQL configuration
├── README.md                   # This file
├── backend/                    # Backend API (Bun + Elysia)
│   ├── src/
│   │   ├── index.ts           # API entry point
│   │   └── db.ts              # Database connection
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   ├── seed.ts            # Seed data script
│   │   └── migrations/        # Database migrations
│   ├── package.json
│   └── tsconfig.json
└── frontend/                   # Frontend Dashboard (React + Vite)
    ├── src/
    │   ├── App.tsx            # Main application component
    │   ├── components/        # React components
    │   │   ├── TaskCard.tsx
    │   │   ├── TaskColumn.tsx
    │   │   ├── TaskModal.tsx
    │   │   └── ConfirmModal.tsx
    │   ├── services/
    │   │   └── taskApi.ts     # API client
    │   └── types/
    │       └── task.ts        # TypeScript types
    ├── package.json
    └── vite.config.ts
```

## 🔧 Development

### Backend Development

```bash
cd backend

# Start dev server with hot reload
bun run dev

# Start production server
bun run start
```

### Frontend Development

```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Database Connection Issues

If you can't connect to the database:

1. Ensure Docker is running:
   ```bash
   docker ps
   ```

2. Check if PostgreSQL container is running:
   ```bash
   docker-compose ps
   ```

3. Restart the database:
   ```bash
   docker-compose restart
   ```

4. Check database logs:
   ```bash
   docker-compose logs postgres
   ```

### Port Already in Use

If port 5432 is already in use:

1. Edit `docker-compose.yml` and change the port mapping:
   ```yaml
   ports:
     - "5433:5432"
   ```

2. Update your `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5433/taskflow"
   ```

### Prisma Migration Issues

If migrations fail:

```bash
# Reset the database and reapply migrations
cd backend
bun run db:reset

# Or push schema without migrations
bun run db:push
```

## 📝 Environment Variables

### Backend (.env)

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskflow"
PORT=3000
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:3000
```

## 🚀 Deployment

### Backend

1. Set up PostgreSQL database on your hosting provider
2. Update `DATABASE_URL` environment variable
3. Run migrations:
   ```bash
   bun run db:migrate:deploy
   ```
4. Start the server:
   ```bash
   bun run start
   ```

### Frontend

1. Update `VITE_API_URL` to your production API URL
2. Build the application:
   ```bash
   npm run build
   ```
3. Deploy the `dist` folder to your hosting provider

## 📄 License

This project is created as a take-home test for Zodiac Engineering Team.

## 👤 Author

**Rifqi Adhis**
- GitHub: [@rifqiadhis](https://github.com/rifqiadhis)

---

Built with ❤️ using Bun, Elysia.js, React, and PostgreSQL
