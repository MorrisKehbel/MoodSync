const API_URL = import.meta.env.VITE_API_URL;
const baseURL = `${API_URL}/ai`;

export const fetchSummary = async (signal) => {
  try {
    const res = await fetch(`${baseURL}/summary`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Unknown error");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateAi = async (endpoint, signal) => {
  try {
    const res = await fetch(`${baseURL}/${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    if (res.status === 204) {
      return null;
    }

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Unknown error");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateTaskSuggestions = async (signal) => {
  try {
    const res = await fetch(`${baseURL}/task-suggestions`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Unknown error");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
