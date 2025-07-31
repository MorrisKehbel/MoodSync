import { useState, useEffect } from "react";
import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";
import {
  getAllGoals,
  createGoal,
  updateGoal,
  updateGoalStatus,
  updateGoalProgress,
  deleteGoal,
} from "../../data/goals";

export const GoalVision = () => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newGoal, setNewGoal] = useState({
    title: "",
    desc: "",
    category: "",
  });
  const [editingProgress, setEditingProgress] = useState(null);
  const [progressForm, setProgressForm] = useState({
    title: "",
    desc: "",
  });
  const [editingGoal, setEditingGoal] = useState(null);
  const [editGoalForm, setEditGoalForm] = useState({
    title: "",
    desc: "",
    category: "",
  });

  const categories = [
    { name: "Social", color: "purple" },
    { name: "Physical health", color: "orange" },
    { name: "Finances", color: "green" },
    { name: "Job satisfaction", color: "blue" },
    { name: "Personal", color: "gray" },
  ];

  const getCategoryImage = (categoryName) => {
    const images = {
      Social:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop&auto=format",
      "Physical health":
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&auto=format",
      Finances:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop&auto=format",
      "Job satisfaction":
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop&auto=format",
      Personal:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format",
    };
    return images[categoryName] || images["Personal"];
  };

  const getCategoryStyles = (categoryName, isSelected = false) => {
    const styles = {
      Social: {
        selected: "bg-purple-500 text-white",
        unselected: "bg-purple-100 text-purple-800 hover:bg-purple-200",
        display: "bg-purple-100 text-purple-800",
      },
      "Physical health": {
        selected: "bg-orange-500 text-white",
        unselected: "bg-orange-100 text-orange-800 hover:bg-orange-200",
        display: "bg-orange-100 text-orange-800",
      },
      Finances: {
        selected: "bg-green-500 text-white",
        unselected: "bg-green-100 text-green-800 hover:bg-green-200",
        display: "bg-green-100 text-green-800",
      },
      "Job satisfaction": {
        selected: "bg-blue-500 text-white",
        unselected: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        display: "bg-blue-100 text-blue-800",
      },
      Personal: {
        selected: "bg-gray-500 text-white",
        unselected: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        display: "bg-gray-100 text-gray-800",
      },
    };

    return isSelected
      ? styles[categoryName]?.selected
      : styles[categoryName]?.unselected;
  };

  const getCategoryDisplayStyles = (categoryName) => {
    const styles = {
      Social: "bg-purple-100 text-purple-800",
      "Physical health": "bg-orange-100 text-orange-800",
      Finances: "bg-green-100 text-green-800",
      "Job satisfaction": "bg-blue-100 text-blue-800",
      Personal: "bg-gray-100 text-gray-800",
    };

    return styles[categoryName] || "bg-gray-100 text-gray-800";
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      const response = await getAllGoals();
      setGoals(response.goals || []);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.title.trim() || !newGoal.desc.trim() || !newGoal.category)
      return;

    try {
      const response = await createGoal({
        title: newGoal.title,
        desc: newGoal.desc,
        category: newGoal.category,
        status: "active",
      });
      setGoals([response.goal, ...goals]);
      setNewGoal({ title: "", desc: "", category: "" });
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const handleStatusUpdate = async (goalId, newStatus) => {
    try {
      const response = await updateGoalStatus(goalId, newStatus);
      setGoals(
        goals.map((goal) => (goal._id === goalId ? response.goal : goal))
      );
    } catch (error) {
      console.error("Error updating goal status:", error);
    }
  };

  const handleProgressUpdate = async (goalId) => {
    try {
      const response = await updateGoalProgress(goalId, progressForm);
      setGoals(
        goals.map((goal) => (goal._id === goalId ? response.goal : goal))
      );
      setEditingProgress(null);
      setProgressForm({ title: "", desc: "" });
    } catch (error) {
      console.error("Error updating goal progress:", error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await deleteGoal(goalId);
        setGoals(goals.filter((goal) => goal._id !== goalId));
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    }
  };

  const startEditingProgress = (goal) => {
    setEditingProgress(goal._id);
    setProgressForm({
      title: goal.progress?.title || "",
      desc: goal.progress?.desc || "",
    });
  };

  const startEditingGoal = (goal) => {
    setEditingGoal(goal._id);
    setEditGoalForm({
      title: goal.title,
      desc: goal.desc,
      category: goal.category,
    });
  };

  const handleUpdateGoal = async (goalId) => {
    try {
      if (
        !editGoalForm.title.trim() ||
        !editGoalForm.desc.trim() ||
        !editGoalForm.category
      ) {
        alert("Please fill in all fields");
        return;
      }

      console.log("Updating goal with data:", editGoalForm);

      const response = await updateGoal(goalId, editGoalForm);
      console.log("Update response:", response);

      setGoals(
        goals.map((goal) => (goal._id === goalId ? response.goal : goal))
      );
      setEditingGoal(null);
      setEditGoalForm({ title: "", desc: "", category: "" });
      alert("Goal updated successfully!");
    } catch (error) {
      console.error("Error updating goal:", error);
      alert(`Failed to update goal: ${error.message}`);
    }
  };

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
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg border border-blue-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 sm:p-3 bg-blue-600 rounded-lg">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Create New Goal
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Define your objectives and start your journey
                </p>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-medium text-blue-700 bg-blue-200 px-3 sm:px-4 py-2 rounded-full border border-blue-300 self-start sm:self-auto">
              📅 Yearly Goals
            </span>
          </div>

          <form onSubmit={handleCreateGoal} className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Goal Details
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    🎯 Goal Title
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    placeholder="e.g., Save for vacation, Learn Spanish..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    📝 Description
                  </label>
                  <textarea
                    value={newGoal.desc}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, desc: e.target.value })
                    }
                    placeholder="Describe your goal in detail and what success looks like..."
                    rows="3"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white resize-none text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Choose Category
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() =>
                      setNewGoal({ ...newGoal, category: category.name })
                    }
                    className={`p-3 sm:p-4 text-xs sm:text-sm font-medium rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${getCategoryStyles(
                      category.name,
                      newGoal.category === category.name
                    )} ${
                      newGoal.category === category.name
                        ? "ring-2 ring-offset-2 ring-blue-400 scale-105"
                        : "hover:shadow-md"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-base sm:text-lg mb-1">
                        {category.name === "Social" && "👥"}
                        {category.name === "Physical health" && "💪"}
                        {category.name === "Finances" && "💰"}
                        {category.name === "Job satisfaction" && "💼"}
                        {category.name === "Personal" && "🌟"}
                      </div>
                      <div className="text-xs leading-tight">
                        {category.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {newGoal.category && (
                <div className="mt-3 sm:mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-medium flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Selected: {newGoal.category}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={
                  !newGoal.title.trim() ||
                  !newGoal.desc.trim() ||
                  !newGoal.category
                }
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 text-base sm:text-lg min-w-[200px]"
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
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
                  Create Goal
                </span>
              </button>
            </div>
          </form>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Your Goals
          </h3>

          {isLoading ? (
            <div className="text-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-500 mt-4 text-sm sm:text-base">
                Loading your goals...
              </p>
            </div>
          ) : goals.length === 0 ? (
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
              <p className="text-gray-500 text-base sm:text-lg">
                No goals yet!
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                Create your first goal above to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {goals.map((goal) => (
                <div
                  key={goal._id}
                  className="bg-white rounded-lg shadow-md border p-3 sm:p-4 hover:shadow-lg transition-shadow"
                >
                  {editingGoal === goal._id ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-800">
                          Edit Goal
                        </h4>
                        <button
                          onClick={() => handleDeleteGoal(goal._id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                          title="Delete goal"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
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
                          value={editGoalForm.title}
                          onChange={(e) =>
                            setEditGoalForm({
                              ...editGoalForm,
                              title: e.target.value,
                            })
                          }
                          placeholder="Goal title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />

                        <textarea
                          value={editGoalForm.desc}
                          onChange={(e) =>
                            setEditGoalForm({
                              ...editGoalForm,
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
                                  setEditGoalForm({
                                    ...editGoalForm,
                                    category: category.name,
                                  })
                                }
                                className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${getCategoryStyles(
                                  category.name,
                                  editGoalForm.category === category.name
                                )}`}
                              >
                                {category.name}
                              </button>
                            ))}
                          </div>
                          {editGoalForm.category && (
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
                              Selected: {editGoalForm.category}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            console.log("Save button clicked!");
                            console.log("Current form data:", editGoalForm);
                            handleUpdateGoal(goal._id);
                          }}
                          disabled={
                            !editGoalForm.title.trim() ||
                            !editGoalForm.desc.trim() ||
                            !editGoalForm.category
                          }
                          className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingGoal(null);
                            setEditGoalForm({
                              title: "",
                              desc: "",
                              category: "",
                            });
                          }}
                          className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-gray-300 hover:bg-gray-400 text-gray-700 transition-colors"
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
                  ) : (
                    <>
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
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1 5a1 1 0 01-1-1v-3H5a1 1 0 110-2h3V8a1 1 0 112 0v3h3a1 1 0 110 2h-3v3a1 1 0 01-1 1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            {goal.status === "completed"
                              ? "Completed"
                              : "Active"}
                          </span>
                          <button
                            onClick={() => handleDeleteGoal(goal._id)}
                            className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                            title="Delete goal"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
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
                        <img
                          src={getCategoryImage(goal.category)}
                          alt={`${goal.category} goal`}
                          className="w-full h-24 sm:h-32 object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format";
                          }}
                        />
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
                          onClick={() =>
                            handleStatusUpdate(
                              goal._id,
                              goal.status === "active" ? "completed" : "active"
                            )
                          }
                          className={`flex-1 py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                            goal.status === "completed"
                              ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                              : "bg-green-600 hover:bg-green-700 text-white"
                          }`}
                        >
                          {goal.status === "completed"
                            ? "Reactivate"
                            : "Finished"}
                        </button>

                        <button
                          onClick={() => startEditingGoal(goal)}
                          className="flex-1 py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                          Update
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageSlideContainer>
  );
};
