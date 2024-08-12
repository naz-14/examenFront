import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { logoutUser } = useUserStore();
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div>
      <nav className="auth-layout">
        <div className="container auth-components-container">
          <div>
            <h1>Examen front</h1>
          </div>
          <div className="nav-buttons">
            <button onClick={() => navigate("/user")} className="btn-primary">
              Modificar Usuario
            </button>
            <button onClick={handleLogout} className="btn-primary">
              Logout
            </button>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default AuthLayout;
