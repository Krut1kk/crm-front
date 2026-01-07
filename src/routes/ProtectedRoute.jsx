import { Navigate, Outlet } from "react-router-dom";
import { routes } from "./routes";
import { authStorage } from "../shared/api/auth/authStorage";

export const ProtectedRoute = () => {
  const token = authStorage.getToken();

  if (!token) return <Navigate to={routes.login} replace />;

  return <Outlet />;
};
