import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Task, TaskStatus } from '../types/task';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (taskData: { title: string; description: string; status: TaskStatus }) => void;
    editTask?: Task | null;
}

export function TaskModal({ isOpen, onClose, onSave, editTask }: TaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>('todo');

    useEffect(() => {
        if (editTask) {
            setTitle(editTask.title);
            setDescription(editTask.description);
            setStatus(editTask.status);
        } else {
            setTitle('');
            setDescription('');
            setStatus('todo');
        }
    }, [editTask, isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSave({ title, description, status });
            handleClose();
        }
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setStatus('todo');
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {editTask ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            placeholder="Enter task description"
                            rows={4}
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TaskStatus)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors font-medium"
                        >
                            {editTask ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
