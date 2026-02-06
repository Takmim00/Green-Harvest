import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 🔄 While checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ❌ Not logged in → redirect to signin
  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  return children;
}
