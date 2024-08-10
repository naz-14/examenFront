import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const user = false;
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
