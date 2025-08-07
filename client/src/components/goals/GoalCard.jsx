import {
  categories,
  getCategoryImage,
  getCategoryDisplayStyles,
  getCategoryStyles,
} from "./goalUtils";

import { PulseLoader } from "react-spinners";

export const GoalCard = ({
  goal,
  onStatusUpdate,
  onDelete,
  onUpdate,
  isEditing,
  onStartEdit,
  onCancelEdit,
  editForm,
  onEditFormChange,
}) => {
  const handleUpdateSubmit = () => {
    if (!editForm.title.trim() || !editForm.desc.trim() || !editForm.category) {
      alert("Please fill in all fields");
      return;
    }
    onUpdate(goal._id, editForm);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md border p-3 sm:p-4 hover:shadow-lg transition-shadow">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800">Edit Goal</h4>
            <button
              onClick={() => onDelete(goal._id)}
              className="text-gray-400 hover:text-red-500 p-1 transition-colors"
              title="Delete goal"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={editForm.title}
              onChange={(e) =>
                onEditFormChange({
                  ...editForm,
                  title: e.target.value,
                })
              }
              placeholder="Goal title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              value={editForm.desc}
              onChange={(e) =>
                onEditFormChange({
                  ...editForm,
                  desc: e.target.value,
                })
              }
              placeholder="Goal description"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() =>
                      onEditFormChange({
                        ...editForm,
                        category: category.name,
                      })
                    }
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${getCategoryStyles(
                      category.name,
                      editForm.category === category.name
                    )}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              {editForm.category && (
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Selected: {editForm.category}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdateSubmit}
              disabled={
                !editForm.title.trim() ||
                !editForm.desc.trim() ||
                !editForm.category
              }
              className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-gray-300 hover:bg-gray-400 text-gray-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              {new Date(goal.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border p-3 sm:p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500">
          {new Date(goal.createdAt).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
              goal.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {goal.status === "completed" ? (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1 5a1 1 0 01-1-1v-3H5a1 1 0 110-2h3V8a1 1 0 112 0v3h3a1 1 0 110 2h-3v3a1 1 0 01-1 1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {goal.status === "completed" ? "Completed" : "Active"}
          </span>
          <button
            onClick={() => onDelete(goal._id)}
            disabled={goal.loading}
            className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default"
            title="Delete goal"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-2 sm:mb-3 rounded-lg overflow-hidden">
        {goal.loading ? (
          <div className="w-full h-24 sm:h-32 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
            <PulseLoader size={8} color="#999" />
          </div>
        ) : (
          <img
            src={
              goal.imageUrl
                ? goal.imageUrl || getCategoryImage(goal.category)
                : getCategoryImage(goal.category)
            }
            alt={`${goal.category} goal`}
            className="w-full h-24 sm:h-32 object-cover"
            onError={(e) => {
              e.target.src = getCategoryImage("Job satisfaction");
            }}
          />
        )}
      </div>
      <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
        {goal.title}
      </h4>
      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
        {goal.desc}
      </p>
      <div className="mb-3 sm:mb-4">
        <span
          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${getCategoryDisplayStyles(
            goal.category
          )}`}
        >
          {goal.category}
        </span>
      </div>
      <div className="flex gap-1 sm:gap-2">
        <button
          disabled={goal.loading}
          onClick={() =>
            onStatusUpdate(
              goal._id,
              goal.status === "active" ? "completed" : "active"
            )
          }
          className={`flex-1 py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default ${
            goal.status === "completed"
              ? "bg-yellow-500 hover:bg-yellow-600 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {goal.status === "completed" ? "Reactivate" : "Complete Goal"}
        </button>

        <button
          onClick={() => onStartEdit(goal)}
          disabled={goal.loading}
          className="flex-1 py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default"
        >
          Update
        </button>
      </div>
    </div>
  );
};
