import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useUser } from "../../../context/index";
import { signup } from "../../../data/auth";

export const SignupModal = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSignupSuccess,
}) => {
  const { setCheckSession } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must have at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (onSignupSuccess) {
        onSignupSuccess({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      }

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      toast.success("Account created successfully! Please login to continue.");
    } catch (error) {
      toast.error(error.message || "Signup failed, please try again.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        pauseOnFocusLoss
        theme="light"
        style={{ zIndex: 100 }}
      />
      <div className="z-50 flex items-center justify-center p-4 backdrop-blur-lg">
        <div className="relative w-full max-w-md p-8 max-h-[90vh] overflow-y-auto bg-white/90 border border-white rounded-2xl shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black/70 hover:text-black text-2xl leading-none cursor-pointer"
            aria-label="Close modal"
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold text-center text-black mb-2">
            Join MoodSync!
          </h2>
          <p className="text-center text-black/80 mb-8">
            Create your account and start your personalized journey toward
            balance and inner peace.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-black/90 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-200/40 placeholder-gray-600/70 border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.username && (
                <p className="mt-1 text-sm italic text-red-600">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black/90 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-200/40 placeholder-gray-600/70 border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.email && (
                <p className="mt-1 text-sm italic text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black/90 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={hidePassword ? "password" : "text"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-200/60 bg-opacity-20 placeholder-gray-600/70 border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setHidePassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-black/70 focus:outline-none"
                >
                  {hidePassword ? (
                    <FaRegEye className="cursor-pointer" size="20" />
                  ) : (
                    <FaRegEyeSlash className="cursor-pointer" size="20" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm italic text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-black/90 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={hideConfirmPassword ? "password" : "text"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-200/60 bg-opacity-20 placeholder-gray-600/70 border border-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setHideConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-black/70 focus:outline-none"
                >
                  {hideConfirmPassword ? (
                    <FaRegEye className="cursor-pointer" size="20" />
                  ) : (
                    <FaRegEyeSlash className="cursor-pointer" size="20" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm italic text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-300/30 hover:bg-gray-200/30 cursor-pointer text-gray-800 font-semibold rounded-lg transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center">
            Already have an account?
            <button
              onClick={onSwitchToLogin}
              className="underline ml-1 bg-transparent border-none cursor-pointer text-inherit"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
