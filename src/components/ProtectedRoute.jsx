import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

/**
 * A wrapper component that redirects to the login or register page if the user is not authenticated
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child components to render if authenticated
 * @param {boolean} props.isAuthenticated - Whether the user is authenticated
 * @param {boolean} props.loading - Whether authentication is being checked
 * @param {string} props.redirectTo - The path to redirect to if not authenticated
 * @returns {React.ReactNode} - The protected component or a redirect
 */
const ProtectedRoute = ({
  children,
  isAuthenticated,
  loading = false,
  redirectTo = "/register",
}) => {
  const location = useLocation();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Redirect to the login page with a return url
    return (
      <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
