import { useEffect } from "react";

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  color,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const COLOR_MAP = {
    blue: "bg-blue-600 hover:bg-blue-500",
    red: "bg-red-600 hover:bg-red-500",
    green: "bg-green-600 hover:bg-green-500",
  };

  const colorClasses = COLOR_MAP[color] || COLOR_MAP["blue"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold">{title || "Are you sure?"}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {message || "This action cannot be undone."}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md bg-gray-50 hover:bg-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm text-white rounded-md cursor-pointer ${colorClasses}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
