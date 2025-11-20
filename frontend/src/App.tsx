import { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { Task, TaskStatus } from './types/task';
import { taskApi } from './services/taskApi';
import { TaskColumn } from './components/TaskColumn';
import { TaskCard } from './components/TaskCard';
import { TaskModal } from './components/TaskModal';
import { ConfirmModal } from './components/ConfirmModal';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; taskId: string | null }>({
    isOpen: false,
    taskId: null,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskApi.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend is running on http://localhost:3000');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: {
    title: string;
    description: string;
    status: TaskStatus;
  }) => {
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData: {
    title: string;
    description: string;
    status: TaskStatus;
  }) => {
    if (!editingTask) return;

    try {
      const updatedTask = await taskApi.updateTask(editingTask.id, taskData);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      setEditingTask(null);
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = (id: string) => {
    setDeleteConfirm({ isOpen: true, taskId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.taskId) return;

    try {
      await taskApi.deleteTask(deleteConfirm.taskId);
      setTasks(tasks.filter((t) => t.id !== deleteConfirm.taskId));
      setDeleteConfirm({ isOpen: false, taskId: null });
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    // Dragging over a column
    if (['todo', 'in-progress', 'done'].includes(overId as string)) {
      const newStatus = overId as TaskStatus;
      if (activeTask.status !== newStatus) {
        setTasks((tasks) =>
          tasks.map((t) =>
            t.id === activeId ? { ...t, status: newStatus } : t
          )
        );
      }
      return;
    }

    // Dragging over another task
    if (overTask && activeTask.status === overTask.status) {
      const oldIndex = tasks.findIndex((t) => t.id === activeId);
      const newIndex = tasks.findIndex((t) => t.id === overId);

      setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over } = event;
    const draggedTask = activeTask; // Save the original task before state changes
    setActiveTask(null);

    if (!over || !draggedTask) return;

    const overId = over.id;
    const originalStatus = draggedTask.status;
    let newStatus: TaskStatus | null = null;

    // Check if dropped on a column
    if (['todo', 'in-progress', 'done'].includes(overId as string)) {
      newStatus = overId as TaskStatus;
    } else {
      // Dropped on another task - get that task's status
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    // Update status on backend if it changed
    if (newStatus && originalStatus !== newStatus) {
      try {
        const updatedTask = await taskApi.updateTask(draggedTask.id, { status: newStatus });
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      } catch (err) {
        // Revert on error
        loadTasks();
      }
    }
  };

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter((task) => task.status === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">TaskFlow</h1>
            <p className="text-purple-100">Manage your tasks with ease</p>
          </div>
          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors shadow-lg flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Task
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-4">
            <TaskColumn
              status="todo"
              title="To Do"
              tasks={getTasksByStatus('todo')}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
            <TaskColumn
              status="in-progress"
              title="In Progress"
              tasks={getTasksByStatus('in-progress')}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
            <TaskColumn
              status="done"
              title="Done"
              tasks={getTasksByStatus('done')}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="rotate-3">
                <TaskCard
                  task={activeTask}
                  onEdit={() => { }}
                  onDelete={() => { }}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSave={editingTask ? handleUpdateTask : handleCreateTask}
          editTask={editingTask}
        />

        <ConfirmModal
          isOpen={deleteConfirm.isOpen}
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm({ isOpen: false, taskId: null })}
        />
      </div>
    </div>
  );
}

export default App;
