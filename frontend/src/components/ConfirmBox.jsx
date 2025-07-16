/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function ConfirmBox({
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
  isOpen,
}) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 rounded-lg bg-white shadow-lg animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Icon and Title */}
        <div className="flex flex-col items-center text-center space-y-2">
          <AlertTriangle size={48} className="text-yellow-500" />
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
