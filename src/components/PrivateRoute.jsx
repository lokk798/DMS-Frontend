import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  // Check if the token exists in localStorage
  const token = localStorage.getItem("token");

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token exists, allow access to the private route
  return <Outlet />;
}
