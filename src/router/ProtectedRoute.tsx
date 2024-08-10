import { Navigate, Outlet } from "react-router-dom";
import { User } from "../types/User";
import AuthLayout from "../layout/AuthLayout";

type ProtectedRouteProps = {
  user: User | null;
};
function ProtectedRoute({ user }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

export default ProtectedRoute;
