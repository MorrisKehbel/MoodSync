const API_URL = import.meta.env.VITE_API_URL;
const baseURL = `${API_URL}/goals`;

export const createGoal = async (goalData) => {
  try {
    const res = await fetch(`${baseURL}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to create goal");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating goal:", error);
    throw error;
  }
};

export const getAllGoals = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (filters.status) queryParams.append("status", filters.status);
    if (filters.page) queryParams.append("page", filters.page);
    if (filters.limit) queryParams.append("limit", filters.limit);

    const url = queryParams.toString()
      ? `${baseURL}?${queryParams.toString()}`
      : baseURL;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch goals");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw error;
  }
};

export const getGoalById = async (goalId) => {
  try {
    const res = await fetch(`${baseURL}/${goalId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch goal");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching goal:", error);
    throw error;
  }
};

export const updateGoal = async (goalId, goalData) => {
  try {
    console.log("Sending update request to:", `${baseURL}/${goalId}`);
    console.log("With data:", goalData);

    const res = await fetch(`${baseURL}/${goalId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalData),
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server error response:", errorData);
      throw new Error(errorData.error || `Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log("Success response:", data);
    return data;
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
};

export const updateGoalStatus = async (goalId, status) => {
  try {
    const res = await fetch(`${baseURL}/${goalId}/status`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to update goal status");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating goal status:", error);
    throw error;
  }
};

export const updateGoalProgress = async (goalId, progress) => {
  try {
    const res = await fetch(`${baseURL}/${goalId}/progress`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ progress }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to update goal progress");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating goal progress:", error);
    throw error;
  }
};

export const deleteGoal = async (goalId) => {
  try {
    const res = await fetch(`${baseURL}/${goalId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete goal");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error;
  }
};

export const getGoalsStats = async () => {
  try {
    const res = await fetch(`${baseURL}/stats`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch goals statistics");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching goals statistics:", error);
    throw error;
  }
};
