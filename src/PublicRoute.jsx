import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export default function PublicRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // If user already logged in → block login/signup
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
