import { useState, useEffect } from "react";
import {
  getAllGoals,
  createGoal,
  updateGoal,
  updateGoalStatus,
  updateGoalProgress,
  deleteGoal,
} from "../../data/goals";

export const useGoals = () => {
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

  const handleCreateGoal = async () => {
    if (!newGoal.title.trim() || !newGoal.desc.trim() || !newGoal.category)
      return;

    const tempId = `temp-${Date.now()}`;
    const optimisticGoal = {
      _id: tempId,
      title: newGoal.title,
      desc: newGoal.desc,
      category: newGoal.category,
      status: "active",
      imageUrl: null,
      loading: true,
    };

    setGoals([optimisticGoal, ...goals]);
    setNewGoal({ title: "", desc: "", category: "" });

    try {
      const response = await createGoal({
        title: newGoal.title,
        desc: newGoal.desc,
        category: newGoal.category,
        status: "active",
      });

      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal._id === tempId ? response.goal : goal))
      );
    } catch (error) {
      console.error("Error creating goal:", error);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== tempId));
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
    try {
      await deleteGoal(goalId);
      setGoals(goals.filter((goal) => goal._id !== goalId));
    } catch (error) {
      console.error("Error deleting goal:", error);
      alert(`Failed to delete goal: ${error.message}`);
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

  const cancelEditingGoal = () => {
    setEditingGoal(null);
    setEditGoalForm({ title: "", desc: "", category: "" });
  };

  const handleUpdateGoal = async (goalId, formData) => {
    try {
      if (
        !formData.title.trim() ||
        !formData.desc.trim() ||
        !formData.category
      ) {
        alert("Please fill in all fields");
        return;
      }

      console.log("Updating goal with data:", formData);

      const response = await updateGoal(goalId, formData);
      console.log("Update response:", response);

      setGoals(
        goals.map((goal) => (goal._id === goalId ? response.goal : goal))
      );
      setEditingGoal(null);
      setEditGoalForm({ title: "", desc: "", category: "" });
    } catch (error) {
      console.error("Error updating goal:", error);
      alert(`Failed to update goal: ${error.message}`);
    }
  };

  return {
    goals,
    isLoading,
    newGoal,
    editingProgress,
    progressForm,
    editingGoal,
    editGoalForm,

    setNewGoal,
    setProgressForm,
    setEditGoalForm,
    handleCreateGoal,
    handleStatusUpdate,
    handleProgressUpdate,
    handleDeleteGoal,
    handleUpdateGoal,
    startEditingProgress,
    startEditingGoal,
    cancelEditingGoal,
    fetchGoals,
  };
};
