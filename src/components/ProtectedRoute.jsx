import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: "Please login Continue",
          from: location.pathname
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;