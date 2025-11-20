import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Task, TaskStatus } from '../types/task';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
    status: TaskStatus;
    title: string;
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const columnColors: Record<TaskStatus, string> = {
    todo: 'bg-gray-50 border-gray-300',
    'in-progress': 'bg-blue-50 border-blue-300',
    done: 'bg-green-50 border-green-300',
};

const columnHeaderColors: Record<TaskStatus, string> = {
    todo: 'bg-gray-200 text-gray-800',
    'in-progress': 'bg-blue-200 text-blue-800',
    done: 'bg-green-200 text-green-800',
};

export function TaskColumn({ status, title, tasks, onEdit, onDelete }: TaskColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });

    return (
        <div className="flex-1 min-w-[300px]">
            <div
                className={`rounded-lg border-2 ${columnColors[status]} ${isOver ? 'border-purple-500 bg-purple-50' : ''
                    } transition-colors`}
            >
                <div className={`${columnHeaderColors[status]} px-4 py-3 rounded-t-lg`}>
                    <h2 className="font-bold text-lg flex items-center justify-between">
                        <span>{title}</span>
                        <span className="bg-white bg-opacity-50 px-2 py-1 rounded-full text-sm">
                            {tasks.length}
                        </span>
                    </h2>
                </div>
                <div
                    ref={setNodeRef}
                    className="p-4 min-h-[500px]"
                >
                    <SortableContext
                        items={tasks.map((task) => task.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </SortableContext>
                    {tasks.length === 0 && (
                        <div className="text-center text-gray-400 mt-8">
                            <p>No tasks</p>
                            <p className="text-sm mt-2">Drag tasks here or create a new one</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
