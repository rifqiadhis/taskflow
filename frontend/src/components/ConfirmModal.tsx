import { createPortal } from 'react-dom';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
            onClick={onCancel}
        >
            <div
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
