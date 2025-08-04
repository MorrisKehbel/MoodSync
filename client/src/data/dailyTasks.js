const API_URL = import.meta.env.VITE_API_URL;
const baseURL = `${API_URL}/daily-tasks`;

class DailyTasksAPI {
  async addTask(taskData) {
    const response = await fetch(`${baseURL}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to add task");
    }

    return response.json();
  }

  async getTasks(date = null) {
    const url = new URL(`${baseURL}`);
    if (date) {
      url.searchParams.append("date", date);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch tasks");
    }

    return response.json();
  }

  async updateTask(taskId, updateData) {
    const response = await fetch(`${baseURL}/${taskId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update task");
    }

    return response.json();
  }

  async deleteTask(taskId) {
    const response = await fetch(`${baseURL}/${taskId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete task");
    }

    return response.json();
  }
}

export const dailyTasksAPI = new DailyTasksAPI();
