import { useState, useEffect } from "react";
import {
  updateUser,
  deleteUser,
  uploadProfilePicture,
  deleteProfilePicture,
} from "../../data/users.js";
import { useUser } from "../../context/index.js";

export const UserSettings = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    settings: {
      theme: "light",
      aiTips: true,
      notifications: true,
    },
    profilePicture: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        // const user = await getUser();

        setFormData({
          username: user.username || "",
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          email: user.email || "",
          password: "",
          settings: {
            theme: user.settings?.theme || "light",
            aiTips: user.settings?.aiTips ?? true,
            notifications: user.settings?.notifications ?? true,
          },
          profilePicture: user.profilePicture || "",
        });
        setPreviewImage(user.profilePicture.url || null);

        setErrors(null);
      } catch (err) {
        setErrors(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    try {
      const updatedUser = await uploadProfilePicture(file);
      setFormData((prev) => ({
        ...prev,
        profilePicture: updatedUser.profilePicture,
      }));
      setSuccessMsg("Profile picture updated successfully");
      setTimeout(() => {
        setSuccessMsg(null);
      }, 2000);
    } catch (err) {
      setErrors(err.message);
    }
  };

  const handleDeleteProfilePicture = async () => {
    if (
      !window.confirm("Are you sure you want to remove your profile picture?")
    )
      return;

    setLoading(true);
    setErrors(null);
    setSuccessMsg(null);

    try {
      const res = await deleteProfilePicture();
      setFormData((prev) => ({
        ...prev,
        profilePicture: "",
      }));
      setPreviewImage(null);
      setSuccessMsg(res.message || "Profile picture removed successfully");
      setTimeout(() => {
        setSuccessMsg(null);
      }, 2000);
    } catch (err) {
      setErrors(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      await deleteUser();
      alert("Account deleted successfully");
      window.location.href = "/dashboard";
    } catch (err) {
      setErrors(err.message);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setErrors(null);
    setSuccessMsg(null);

    const payload = {
      username: formData.username,
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      ...(formData.password ? { password: formData.password } : {}),
      settings: {
        theme: formData.settings.theme,
        aiTips: formData.settings.aiTips,
        notifications: formData.settings.notifications,
      },
    };

    try {
      const updatedUser = await updateUser(payload);
      setFormData((prev) => ({
        ...prev,
        ...updatedUser,
        password: "",
        settings: {
          theme: updatedUser.settings?.theme || "light",
          aiTips: updatedUser.settings?.aiTips ?? true,
          notifications: updatedUser.settings?.notifications ?? true,
        },
      }));
      setSuccessMsg("Settings updated successfully");
      setTimeout(() => {
        setSuccessMsg(null);
      }, 2000);
    } catch (err) {
      setErrors(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isValidImageUrl = (url) => {
    return typeof url === "string" && url.match(/\.(jpeg|jpg|gif|png|webp)$/i);
  };

  return (
    <div className="container mx-auto px-4 py-25 text-black">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center drop-shadow-lg leading-snug">
          User Setting
        </h2>

        {(loading || errors || successMsg) && (
          <div
            className={`mt-6 w-full max-w-lg mx-auto px-4 py-3 rounded-lg shadow-md text-sm font-medium flex items-center justify-center space-x-2 ${
              loading
                ? "bg-blue-100 border border-blue-300 text-blue-700"
                : errors
                ? "bg-red-100 border border-red-300 text-red-700"
                : "bg-green-100 border border-green-300 text-green-700"
            }`}
          >
            {loading && (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span>Loading...</span>
              </>
            )}
            {errors && (
              <>
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>{errors}</span>
              </>
            )}
            {successMsg && (
              <>
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{successMsg}</span>
              </>
            )}
          </div>
        )}

        <div className="flex justify-between items-start ml-13">
          <div className="w-full max-w-md">
            {["username", "firstname", "lastname", "email"].map((field) => (
              <div key={field} className="mt-4">
                <label className="block font-semibold text-lg">
                  {field === "firstname"
                    ? "First Name"
                    : field === "lastname"
                    ? "Last Name"
                    : field === "username"
                    ? "Username"
                    : field === "email"
                    ? "Email"
                    : field}
                  :
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 rounded-xl border border-gray-300 transition-all focus:outline-2 focus:outline-blue-400 bg-gray-50"
                />
              </div>
            ))}

            <label className="block font-semibold mt-4 text-lg">
              Password:
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              placeholder="Enter your new password"
              onChange={handleChange}
              className="mt-2 w-full p-3 rounded-xl border border-gray-300 transition-all focus:outline-2 focus:outline-blue-400 bg-gray-50"
            />
          </div>

          <div className="ml-8 flex flex-col items-center mr-13">
            <div className="w-39 h-39 bg-gray-100 border-gray-300 border-2 rounded-full overflow-hidden mb-2 flex items-center justify-center">
              {previewImage ||
              isValidImageUrl(formData?.profilePicture?.url) ? (
                <img
                  src={previewImage || formData.profilePicture.url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-400">No image</span>
              )}
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <label className="cursor-pointer bg-gray-200 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {(previewImage || formData.profilePicture) && (
                <button
                  type="button"
                  onClick={handleDeleteProfilePicture}
                  className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition flex items-center gap-1"
                  disabled={loading}
                  title="Remove profile picture"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Delete
                </button>
              )}
            </div>
            <p
              onClick={handleDelete}
              className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 
                    bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold 
                    rounded-full shadow-md transition-all duration-300 
                    hover:scale-105 hover:from-red-500 hover:to-pink-500 
                    active:scale-95 cursor-pointer text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Delete Account
            </p>

            <div className="mt-12 space-y-4 text-lg">
              {[
                {
                  label: "Dark Mode",
                  name: "theme",
                  isTheme: true,
                  isActive: formData.settings.theme === "dark",
                },
                {
                  label: "AI Tips",
                  name: "aiTips",
                  isTheme: false,
                  isActive: formData.settings.aiTips,
                },
                {
                  label: "Notifications",
                  name: "notifications",
                  isTheme: false,
                  isActive: formData.settings.notifications,
                },
              ].map(({ label, name, isTheme, isActive }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    let newValue;
                    if (isTheme) {
                      newValue = isActive ? "light" : "dark";
                    } else {
                      newValue = !isActive;
                    }
                    setFormData((prev) => ({
                      ...prev,
                      settings: {
                        ...prev.settings,
                        [name]: newValue,
                      },
                    }));
                  }}
                  className="flex items-center justify-between gap-x-6 w-full max-w-xs cursor-pointer"
                >
                  <span className="font-semibold">{label}:</span>
                  <div className="relative inline-block w-11 h-6">
                    <div
                      className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition duration-300 ${
                        isActive ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                        isActive ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 flex gap-7 items-center justify-center">
          <button
            className="bg-gray-400 text-white px-11 hover:bg-gray-500 transition py-2 rounded-xl cursor-pointer"
            disabled
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-500 transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
