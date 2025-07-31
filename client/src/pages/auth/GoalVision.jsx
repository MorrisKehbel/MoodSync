import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";
import { GoalForm, GoalsList, useGoals } from "../../components/goals";

export const GoalVision = () => {
  const {
    goals,
    isLoading,
    newGoal,
    editingGoal,
    editGoalForm,
    setNewGoal,
    setEditGoalForm,
    handleCreateGoal,
    handleStatusUpdate,
    handleDeleteGoal,
    handleUpdateGoal,
    startEditingGoal,
    cancelEditingGoal,
  } = useGoals();

  return (
    <PageSlideContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Goals
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Set, track, and achieve your personal goals
          </p>
        </div>

        <GoalForm
          goalData={newGoal}
          onGoalChange={setNewGoal}
          onSubmit={handleCreateGoal}
        />

        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Your Goals
          </h3>

          <GoalsList
            goals={goals}
            isLoading={isLoading}
            editingGoal={editingGoal}
            editGoalForm={editGoalForm}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDeleteGoal}
            onUpdate={handleUpdateGoal}
            onStartEdit={startEditingGoal}
            onCancelEdit={cancelEditingGoal}
            onEditFormChange={setEditGoalForm}
          />
        </div>
      </div>
    </PageSlideContainer>
  );
};
