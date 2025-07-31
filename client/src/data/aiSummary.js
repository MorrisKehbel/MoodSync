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

    if (res.status === 404) {
      await generateSummary();
      return;
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

const generateSummary = async (signal) => {
  try {
    const res = await fetch(`${baseURL}/summary`, {
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
