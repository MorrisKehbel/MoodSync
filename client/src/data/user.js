const API_URL = import.meta.env.VITE_API_URL;
const baseURL = `${API_URL}/user`;

export const addDailyActivities = async (formData) => {
  try {
    const res = await fetch(`${baseURL}/daily-entry`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (!errorData.error) {
        throw new Error(
          "An error occurred while adding your Daily Activities. Please try again later."
        );
      }
      throw new Error(errorData.error);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDailyActivitiesById = async (date) => {
  try {
    const res = await fetch(`${baseURL}/daily-entry/${date}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (!errorData.error) {
        throw new Error(
          "An error occurred while getting your Daily Activities. Please try again later."
        );
      }
      throw new Error(errorData.error);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllDailyActivities = async () => {
  try {
    const res = await fetch(`${baseURL}/daily-entry`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (!errorData.error) {
        throw new Error(
          "An error occurred while getting your Daily Activities. Please try again later."
        );
      }
      throw new Error(errorData.error);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateDailyActivities = async (formData) => {
  if (!formData || formData.length === 0) return;

  try {
    const res = await fetch(`${baseURL}/daily-entry`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (!errorData.error) {
        throw new Error(
          "An error occurred while updating your Daily Activities. Please try again later."
        );
      }
      throw new Error(errorData.error);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
