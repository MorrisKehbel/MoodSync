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
    return <PulseLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};
