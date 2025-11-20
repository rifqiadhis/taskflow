# TaskFlow Frontend

A modern task management application built with React, TypeScript, Tailwind CSS, and drag-and-drop functionality.

## Features

- 🎯 **Drag & Drop**: Intuitive drag-and-drop interface for moving tasks between columns
- 📋 **Task Management**: Create, edit, and delete tasks with ease
- 🎨 **Beautiful UI**: Modern gradient design with Tailwind CSS
- 🔄 **Real-time Updates**: Tasks sync with backend API
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎭 **Three Status Columns**: To Do, In Progress, and Done

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **@dnd-kit** - Drag and drop functionality
- **Vite** - Build tool

## Prerequisites

- Node.js (v18 or higher recommended)
- Backend API running on `http://localhost:3000`

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── TaskCard.tsx    # Individual task card with drag functionality
│   ├── TaskColumn.tsx  # Column container for tasks
│   └── TaskModal.tsx   # Modal for creating/editing tasks
├── services/           # API services
│   └── taskApi.ts     # Backend API integration
├── types/             # TypeScript type definitions
│   └── task.ts        # Task-related types
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## API Endpoints

The frontend expects the following API endpoints:

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a single task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Task Status Values

- `todo` - To Do
- `in-progress` - In Progress
- `done` - Done

## Usage

1. **Create a Task**: Click the "Add Task" button in the top right
2. **Edit a Task**: Click the edit icon (pencil) on any task card
3. **Delete a Task**: Click the delete icon (trash) on any task card
4. **Move a Task**: Drag and drop tasks between columns or reorder within a column

## Configuration

To change the backend API URL, edit `src/services/taskApi.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3000'; // Change this to your backend URL
```
