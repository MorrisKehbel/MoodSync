import { useState, useEffect, useRef } from "react";
import {
  updateUser,
  deleteUser,
  uploadProfilePicture,
  deleteProfilePicture,
} from "../../data/users.js";
import { useUser } from "../../context/index.js";
import { PageSlideContainer } from "../../components/shared/wrapper/PageSlideContainer";
import { ConfirmModal } from "../../components/shared/ui/ConfirmModal.jsx";

export const UserSettings = () => {
  const { user, setUser } = useUser();

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const [isDeletePictureOpen, setIsDeletePictureOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getInitialState = (user) => ({
    username: user.username || "",
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    password: "",
    settings: {
      theme: user.settings?.theme ?? "light",
      aiTips: user.settings?.aiTips ?? true,
      notifications: user.settings?.notifications ?? true,
    },
    profilePicture: user.profilePicture || "",
  });

  const initialUserDataRef = useRef(getInitialState(user));
  const [formData, setFormData] = useState(getInitialState(user));

  useEffect(() => {
    if (user) {
      setPreviewImage(user.profilePicture?.url || null);
    }
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
      setUser((prev) => ({
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
    setLoading(true);
    setErrors(null);
    setSuccessMsg(null);

    try {
      const res = await deleteProfilePicture();
      setUser((prev) => ({
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
    try {
      await deleteUser();
      window.location.href = "/";
    } catch (err) {
      setErrors(err.message);
    }
  };

  const handleCancel = () => {
    setFormData(initialUserDataRef.current);
  };

  const hasChanges = () => {
    const initial = initialUserDataRef.current;
    if (!initial) return false;

    return (
      formData.username !== initial.username ||
      formData.firstname !== initial.firstname ||
      formData.lastname !== initial.lastname ||
      formData.email !== initial.email ||
      formData.password.trim() !== "" ||
      formData.settings.theme !== initial.settings.theme ||
      formData.settings.aiTips !== initial.settings.aiTips ||
      formData.settings.notifications !== initial.settings.notifications
    );
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
      setUser((prev) => ({
        ...prev,
        ...updatedUser,
        settings: {
          theme: updatedUser.settings?.theme || "light",
          aiTips: updatedUser.settings?.aiTips ?? true,
          notifications: updatedUser.settings?.notifications ?? true,
        },
      }));
      const newInitial = getInitialState(updatedUser);
      initialUserDataRef.current = newInitial;
      setFormData(newInitial);
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

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      formData.settings.theme === "dark" ? "dark" : "light"
    );

    return () => {
      const initial = initialUserDataRef.current;
      if (formData.settings.theme !== initial.settings.theme) {
        document.documentElement.setAttribute(
          "data-theme",
          initial.settings.theme === "dark" ? "dark" : "light"
        );
      }
    };
  }, [formData.settings.theme]);

  return (
    <PageSlideContainer>
      <div className="container mx-auto text-black">
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
              aria-live="polite"
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

          <div className="flex flex-col sm:flex-row justify-center items-center lg:items-stretch gap-8">
            <div className="w-full max-w-md lg:mb-0 mb-8 ">
              {["username", "firstname", "lastname", "email"].map((field) => {
                const labels = {
                  username: "Username",
                  firstname: "First Name",
                  lastname: "Last Name",
                  email: "Email",
                };
                const autocompleteMap = {
                  username: "username",
                  firstname: "given-name",
                  lastname: "family-name",
                  email: "email",
                };

                return (
                  <div key={field} className="mt-4">
                    <label
                      htmlFor={field}
                      className="block font-semibold text-lg"
                    >
                      {labels[field]}:
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      autoComplete={autocompleteMap[field]}
                      value={formData[field]}
                      onChange={handleChange}
                      className="mt-2 w-full p-3 rounded-xl border border-gray-300 transition-all focus:outline-2 focus:outline-blue-400 bg-gray-50"
                    />
                  </div>
                );
              })}

              <label
                htmlFor="password"
                className="block font-semibold mt-4 text-lg"
              >
                Password:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                placeholder="Enter your new password"
                onChange={handleChange}
                className="mt-2 w-full p-3 rounded-xl border border-gray-300 transition-all focus:outline-2 focus:outline-blue-400 bg-gray-50"
              />
            </div>
            <div className="w-full sm:w-auto flex flex-col items-center lg:ml-8">
              <div className="w-39 h-39 bg-gray-100 border-gray-300 border-2 rounded-full overflow-hidden mb-2 flex items-center justify-center">
                {previewImage || isValidImageUrl(user?.profilePicture?.url) ? (
                  <img
                    src={previewImage || user.profilePicture.url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-400">No image</span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center mt-4 gap-2">
                <label className="cursor-pointer bg-gray-200 text-black px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition flex items-center">
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

                {user.profilePicture?.url && (
                  <>
                    <ConfirmModal
                      isOpen={isDeletePictureOpen}
                      onClose={() => setIsDeletePictureOpen(false)}
                      onConfirm={handleDeleteProfilePicture}
                      title="Delete your Profile Picture?"
                      message="Are you sure you really want to delete your Profile Picture?"
                      color="red"
                    />
                    <button
                      type="button"
                      onClick={() => setIsDeletePictureOpen(true)}
                      className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition flex items-center cursor-pointer"
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
                  </>
                )}
              </div>
              <ConfirmModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                title="Delete Account?"
                message="Are you sure you really want to delete your account?"
                color="red"
              />
              <p
                onClick={() => setIsDeleteOpen(true)}
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

              <div className="w-full mt-12 space-y-4 text-lg">
                {[
                  {
                    label: "Dark Mode",
                    name: "theme",
                    isTheme: true,
                    isActive: formData.settings.theme === "dark",
                  },
                  {
                    label: "AI Features",
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
                    className="flex items-center justify-between gap-x-6 w-full max-w-sm sm:max-w-xs cursor-pointer mx-auto"
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
          <ConfirmModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={handleSave}
            title="Keep These Changes?"
            message="Are you sure you want to save your changes?"
          />
          <div className="mt-12 flex flex-col sm:flex-row gap-7 items-center justify-center">
            <button
              className="w-full sm:w-auto bg-gray-400 text-white px-4 hover:bg-gray-300 transition py-3 sm:py-2 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-default"
              onClick={handleCancel}
              disabled={!hasChanges()}
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(true)}
              disabled={!hasChanges()}
              className="w-full sm:w-auto bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-blue-500 transition cursor-pointer disabled:opacity-30 disabled:cursor-default"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </PageSlideContainer>
  );
};
