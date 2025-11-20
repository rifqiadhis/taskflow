import type { Task, CreateTaskDto, UpdateTaskDto } from '../types/task';

const API_BASE_URL = 'http://localhost:3000';

export const taskApi = {
    async getAllTasks(): Promise<Task[]> {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        return data.tasks;
    },

    async getTaskById(id: string): Promise<Task> {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch task');
        }
        const data = await response.json();
        return data.task;
    },

    async createTask(taskData: CreateTaskDto): Promise<Task> {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        const data = await response.json();
        return data.task;
    },

    async updateTask(id: string, taskData: UpdateTaskDto): Promise<Task> {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        const data = await response.json();
        return data.task;
    },

    async deleteTask(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    },
};
