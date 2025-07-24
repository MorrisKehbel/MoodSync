import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { UserContext } from "./index";
import { me, signout } from "../data/auth";

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [checkSession, setCheckSession] = useState(true);

  const [showAuth, setShowAuth] = useState(false);
  const [currentMode, setCurrentMode] = useState("login");

  const logout = async () => {
    await signout();
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await me();

        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          console.error(error);
          toast.error("Failed connection to server", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            pauseOnHover: false,
            closeOnClick: false,
            progress: undefined,
            theme: "light",
          });
          setIsAuthenticated(null);
          return;
        }
        setIsAuthenticated(false);
      } finally {
        setCheckSession(false);
      }
    };

    checkSession && getUser();
  }, [checkSession]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    checkSession,
    setCheckSession,
    showAuth,
    setShowAuth,
    setCurrentMode,
    currentMode,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
