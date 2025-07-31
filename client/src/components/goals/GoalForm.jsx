import { CategorySelector } from "./CategorySelector";

export const GoalForm = ({
  goalData,
  onGoalChange,
  onSubmit,
  isEditing = false,
  onCancel,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const isFormValid =
    goalData.title.trim() && goalData.desc.trim() && goalData.category;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      {!isEditing && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-600 rounded-md">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                {isEditing ? "Edit Goal" : "Create New Goal"}
              </h2>
            </div>
          </div>
          {!isEditing && (
            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
              📅 New Goal
            </span>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">
              🎯 Goal Title
            </label>
            <input
              type="text"
              value={goalData.title}
              onChange={(e) =>
                onGoalChange({ ...goalData, title: e.target.value })
              }
              placeholder="e.g., Save for vacation, Learn Spanish..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">
              📝 Description
            </label>
            <textarea
              value={goalData.desc}
              onChange={(e) =>
                onGoalChange({ ...goalData, desc: e.target.value })
              }
              placeholder="Describe your goal briefly..."
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-700">
            🏷️ Category
          </label>
          <CategorySelector
            selectedCategory={goalData.category}
            onCategorySelect={(category) =>
              onGoalChange({ ...goalData, category })
            }
            compact={true}
          />
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="submit"
            disabled={!isFormValid}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-md shadow-sm hover:shadow transition-all duration-200 text-sm"
          >
            {isEditing ? "Update Goal" : "Create Goal"}
          </button>
          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-md shadow-sm hover:shadow transition-all duration-200 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
