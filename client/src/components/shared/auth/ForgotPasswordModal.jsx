import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { forgotPassword } from "../../../data/auth";

export const ForgotPasswordModal = ({ isOpen, onClose, onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();

  if (!isOpen) return null;

  const sendEmail = async () => {
    try {
      const result = await emailjs.sendForm(
        "service_l7ljht9",
        "template_d953j3a",
        form.current,
        "sQwe6SyvduUQRNwRS"
      );

      return {
        type: "success",
        text: "Password reset email sent successfully!",
      };
    } catch (error) {
      console.error("Email sending error:", error);
      return {
        type: "error",
        text: `Failed to send email: ${
          error.message || error.text || "Please try again."
        }`,
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgotPassword(email);
      if (response.resetToken) {
        const formElement = form.current;
        formElement.querySelector('input[name="to_email"]').value =
          response.email;
        formElement.querySelector('input[name="to_name"]').value =
          response.username || "User";
        formElement.querySelector(
          'input[name="reset_link"]'
        ).value = `${window.location.origin}/reset-password?token=${response.resetToken}`;
        formElement.querySelector('input[name="from_name"]').value =
          "MoodSync Team";

        formElement.querySelector('input[name="email"]').value = response.email;
        const emailResult = await sendEmail();

        if (emailResult.type === "success") {
          toast.success(
            "Password reset instructions have been sent to your email! Please check your spam/junk folder if you don't see it."
          );
          setEmail("");
          form.current.reset();
          setTimeout(() => {
            onClose();
          }, 8000);
        } else {
          toast.error(emailResult.text);
        }
      } else {
        toast.success(
          "If the email exists in our system, you will receive a password reset link."
        );
        setEmail("");
        setTimeout(() => {
          onClose();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          onClick={onClose}
          className="absolute top-4 right-4 text-black/70 hover:text-black text-2xl leading-none cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center text-black mb-2">
          Reset Password
        </h2>

        <p className="text-center text-black/80 mb-8">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit} ref={form}>
          <input type="hidden" name="to_email" />
          <input type="hidden" name="to_name" />
          <input type="hidden" name="reset_link" />
          <input type="hidden" name="from_name" />

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black/90 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 placeholder-gray-600/70 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-200/40 border-gray-200"
              required
            />
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
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onBackToLogin}
            className="text-sm text-black underline bg-transparent border-none cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </div>
    </>
  );
};
