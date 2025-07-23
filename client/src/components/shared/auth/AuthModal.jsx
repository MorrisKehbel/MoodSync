import { useState } from "react";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";

export const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const switchMode = (newMode) => {
    if (isAnimating || currentMode === newMode) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentMode(newMode);
      setIsAnimating(false);
    }, 250);
  };

  const handleSwitchToSignup = () => {
    setShowWelcomeMessage(false);
    switchMode("signup");
  };

  const handleSwitchToLogin = () => {
    setShowWelcomeMessage(false);
    switchMode("login");
  };

  const handleClose = () => {
    setShowWelcomeMessage(false);
    setLoginData({ login: "", password: "" });
    setCurrentMode("login");

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 250);
  };

  const handleLoginSuccess = () => {
    setShowWelcomeMessage(false);
    setLoginData({ login: "", password: "" });
    setCurrentMode("login");
  };

  const handleSignupSuccess = (userData) => {
    setLoginData({
      login: userData.email || userData.username,
      password: userData.password,
    });
    setShowWelcomeMessage(true);
    switchMode("login");
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
      <div
        className={`transform-gpu ${
          isAnimating ? "modal-flip-out" : "modal-flip-in"
        }`}
        style={{ perspective: "1000px" }}
      >
        {currentMode === "login" ? (
          <LoginModal
            isOpen={true}
            onClose={handleClose}
            onSwitchToSignup={handleSwitchToSignup}
            prefilledData={loginData}
            showWelcomeMessage={showWelcomeMessage}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <SignupModal
            isOpen={true}
            onClose={handleClose}
            onSwitchToLogin={handleSwitchToLogin}
            onSignupSuccess={handleSignupSuccess}
          />
        )}
      </div>
    </div>
  );
};
