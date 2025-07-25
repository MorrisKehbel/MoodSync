import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { resetPassword } from "../data/auth";

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const resetToken = searchParams.get("token");
    if (!resetToken) {
      toast.error("Invalid reset link");
      navigate("/");
      return;
    }
    setToken(resetToken);
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, newPassword);
      toast.success("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        pauseOnFocusLoss
        theme="light"
        style={{ zIndex: 100 }}
      />

      <div className="relative w-full max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-black/70 hover:text-black text-2xl leading-none cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center text-black mb-2">
          Set New Password
        </h2>

        <p className="text-center text-black/80 mb-8">
          Please enter your new password below.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-black/90 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={hidePassword ? "password" : "text"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-600/70 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-200/40 border-gray-200"
                required
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
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-black/90 mb-1"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={hideConfirmPassword ? "password" : "text"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-600/70 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-200/40 border-gray-200"
                required
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
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg transform hover:scale-105"
            }`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};
