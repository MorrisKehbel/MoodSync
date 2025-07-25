import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useUser } from "../../../context/index";
import { signin, googleLogin } from "../../../data/auth";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

export const LoginModal = ({
  isOpen,
  onClose,
  onSwitchToSignup,
  prefilledData,
  showWelcomeMessage,
  onLoginSuccess,
}) => {
  const { setCheckSession } = useUser();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [errors, setErrors] = useState({ login: "", password: "" });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    if (prefilledData && prefilledData.login && prefilledData.password) {
      setLogin(prefilledData.login);
      setPassword(prefilledData.password);
    }
  }, [prefilledData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const responseGoogle = async (authResult) => {
    try {
      const user = await googleLogin(authResult.code);

      setCheckSession(true);
      if (onLoginSuccess) onLoginSuccess();
      onClose();
      navigate("/dashboard");
      toast.success("Logged in with Google!");
    } catch (err) {
      toast.error("Google login failed, please try again.");
      console.error("Error while requesting google code:", err);
    }
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  if (!isOpen) return null;

  if (showForgotPassword) {
    return (
      <ForgotPasswordModal
        isOpen={true}
        onClose={() => {
          setShowForgotPassword(false);
          onClose();
        }}
        onBackToLogin={() => setShowForgotPassword(false)}
      />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({ login: "", password: "" });

    if (login.trim().length < 3) {
      setErrors((prev) => ({
        ...prev,
        login: "Login must be at least 3 characters long",
      }));
    }

    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must have at least 8 characters",
      }));
    }

    if (login.trim().length < 3 || password.length < 8) return;

    try {
      await signin({
        login: login,
        password: password,
        rememberme: rememberMe,
      });

      setCheckSession(true);
      setPassword("");
      setLogin("");

      if (onLoginSuccess) {
        onLoginSuccess();
      }

      onClose();
      navigate("/dashboard");
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
            {showWelcomeMessage ? "Welcome to MoodSync!" : "Welcome back!"}
          </h2>

          {showWelcomeMessage && (
            <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg">
              <p className="text-center text-green-800 font-medium">
                🎉 Account created successfully!
              </p>
              <p className="text-center text-green-700 text-sm mt-1">
                Your credentials are ready below. Click the green button to
                login!
              </p>
            </div>
          )}

          <p className="text-center text-black/80 mb-8">
            {showWelcomeMessage
              ? "Your credentials have been pre-filled. Click the green 'Complete Login' button below!"
              : "Sign in to continue your personalized journey toward balance and inner peace."}
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="login"
                className="block text-sm font-medium text-black/90 mb-1"
              >
                Email or Username
              </label>

              <input
                id="login"
                placeholder="example@email.com"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className={`w-full px-4 py-2 placeholder-gray-600/70 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  showWelcomeMessage && prefilledData?.login
                    ? "bg-green-50 border-green-300"
                    : "bg-gray-200/40 border-gray-200"
                }`}
              />
              {errors.login && (
                <p className="mt-1 text-sm italic text-red-600">
                  {errors.login}
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
                  type={hidePassword ? "password" : "text"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2 placeholder-gray-600/70 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    showWelcomeMessage && prefilledData?.password
                      ? "bg-green-50 border-green-300"
                      : "bg-gray-200/60 bg-opacity-20 border-gray-200"
                  }`}
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

            <div className="flex items-center justify-between">
              <label className="flex items-center text-black/90">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-purple-600 bg-white bg-opacity-20 border-white rounded focus:ring-transparent"
                />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-black underline bg-transparent border-none cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                showWelcomeMessage
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-lg transform hover:scale-105 animate-pulse"
                  : "bg-gray-300/30 hover:bg-gray-200/30 text-gray-800"
              }`}
            >
              {showWelcomeMessage ? "🚀 Complete Login" : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center text-black/80">Or</div>

          <button
            onClick={googleLoginHandler}
            type="button"
            className="mt-4 flex items-center bg-gray-300/30 hover:bg-gray-200/30 cursor-pointer justify-center w-full py-3 border border-white/70 rounded-lg text-black/90  transition"
          >
            <FcGoogle className="mr-2" size={20} />
            Sign In with Google
          </button>

          <p className="mt-6 text-center">
            Don't have an account?
            <button
              onClick={onSwitchToSignup}
              className="underline ml-1 bg-transparent border-none cursor-pointer text-inherit"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
