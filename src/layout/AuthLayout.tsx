import { useUserStore } from "../store/userStore";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const { logoutUser } = useUserStore();
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {children}
    </div>
  );
}

export default AuthLayout;
