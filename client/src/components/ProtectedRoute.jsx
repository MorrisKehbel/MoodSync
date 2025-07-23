import { Navigate } from "react-router";
import { useUser } from "../context";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkSession } = useUser();

  // Show loading while checking session
  if (checkSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render the protected component if authenticated
  return children;
};
