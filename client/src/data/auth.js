const API_URL = import.meta.env.VITE_API_URL;
const baseURL = `${API_URL}/auth`;

export const signup = async (formData) => {
  try {
    const res = await fetch(`${baseURL}/signup`, {
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
          "An error occurred while creating your account. Please try again later."
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

export const signin = async (formData) => {
  try {
    const res = await fetch(`${baseURL}/signin`, {
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
          "An error occured during sign in. Please try again later."
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

export const signout = async () => {
  try {
    const res = await fetch(`${baseURL}/signout`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (!errorData.error) {
        throw new Error("An error occurred during sign out.");
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

export const me = async () => {
  try {
    const res = await fetch(`${baseURL}/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (!errorData.error) {
        throw new Error("An error occurred while fetching user data.");
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
