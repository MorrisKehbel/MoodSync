import { createContext, useContext } from "react";
import { UserProvider } from "./UserProvider";

const UserContext = createContext();

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within an UserProvider");
  return context;
};

export { UserContext, UserProvider, useUser };
