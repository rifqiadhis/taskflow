import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white rounded-lg shadow-md p-4 mb-3 cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 text-lg flex-1 break-words">
                    {task.title}
                </h3>
                <div className="flex gap-2 ml-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(task);
                        }}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit task"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task.id);
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete task"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {task.description && (
                <p className="text-gray-600 text-sm mb-3 break-words whitespace-pre-wrap">
                    {task.description}
                </p>
            )}
            <div className="text-xs text-gray-500">
                Updated: {formatDate(task.updatedAt)}
            </div>
        </div>
    );
}
