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

export const forgotPassword = async (email) => {
  try {
    const res = await fetch(`${baseURL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (!errorData.error) {
        throw new Error("An error occurred while processing your request.");
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

export const resetPassword = async (token, newPassword) => {
  try {
    const res = await fetch(`${baseURL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (!errorData.error) {
        throw new Error("An error occurred while resetting your password.");
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

export const googleLogin = async (code) => {
  try {
    const res = await fetch(`${baseURL}/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ code }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (!errorData.error) {
        throw new Error("Google login failed. Please try again.");
      }
      throw new Error(errorData.error);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};
