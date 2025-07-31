import { useEffect } from "react";

import { useUser } from "../../../context";
import { PulseLoader } from "react-spinners";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkSession, setShowAuth, showAuth } = useUser();

  useEffect(() => {
    if (!checkSession && !isAuthenticated) {
      setShowAuth(true);
    }
  }, [checkSession, isAuthenticated, showAuth]);

  if (checkSession) {
    return (
      <div className="flex items-center justify-center w-full">
        <PulseLoader color="#ffffff" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};
