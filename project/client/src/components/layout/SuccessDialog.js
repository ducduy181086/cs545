import React, { useEffect } from "react";

export default function SuccessDialog({ open, onClose, title, message }) {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full text-center">
                <h2 className="text-lg font-semibold text-green-600">{title}</h2>
                <p className="text-gray-700 mt-2">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

