export const VITE_API_URL = import.meta.env.VITE_API_URL;

const getUser = async () => {
  try {
    const response = await fetch(`${VITE_API_URL}/users`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const updateUser = async (userData) => {
  try {
    const response = await fetch(`${VITE_API_URL}/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUser = async () => {
  try {
    const response = await fetch(`${VITE_API_URL}/users`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const uploadProfilePicture = async (file) => {
  const formDataFile = new FormData();
  formDataFile.append("profilePicture", file);

  try {
    const res = await fetch(`${VITE_API_URL}/users/upload-profile-picture`, {
      method: "PUT",
      body: formDataFile,
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to upload profile picture");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};

const deleteProfilePicture = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/users/delete-profile-picture`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete profile picture");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting profile picture:", error);
    throw error;
  }
};

export { getUser, updateUser, deleteUser, uploadProfilePicture, deleteProfilePicture};
