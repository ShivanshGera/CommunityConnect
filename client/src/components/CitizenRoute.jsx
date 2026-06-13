import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CitizenRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user?.role !== "citizen") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default CitizenRoute;