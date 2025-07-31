import { GoalCard } from "./GoalCard";

export const GoalsList = ({
  goals,
  isLoading,
  editingGoal,
  editGoalForm,
  onStatusUpdate,
  onDelete,
  onUpdate,
  onStartEdit,
  onCancelEdit,
  onEditFormChange,
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-gray-500 mt-4 text-sm sm:text-base">
          Loading your goals...
        </p>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg mx-4 sm:mx-0">
        <svg
          className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-500 text-base sm:text-lg">No goals yet!</p>
        <p className="text-gray-400 text-sm sm:text-base">
          Create your first goal above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {goals.map((goal) => (
        <GoalCard
          key={goal._id}
          goal={goal}
          isEditing={editingGoal === goal._id}
          editForm={editGoalForm}
          onStatusUpdate={onStatusUpdate}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
          onEditFormChange={onEditFormChange}
        />
      ))}
    </div>
  );
};
