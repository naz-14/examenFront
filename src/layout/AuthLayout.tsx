import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { logoutUser } = useUserStore();
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div className="auth-layout-container">
      <div>
        <nav className="auth-layout">
          <div className="container auth-components-container">
            <div>
              <h1>Examen front</h1>
            </div>
            <div className="nav-buttons">
              <button onClick={() => navigate("/user")} className="btn-primary">
                Usuario
              </button>
              <button onClick={handleLogout} className="btn-primary">
                Logout
              </button>
            </div>
          </div>
        </nav>
        {children}
      </div>
      <footer className="footer-container">
        <div className="container">
          <div>
            <h1 className="footer-text">Uriel Alvarez V.</h1>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AuthLayout;
