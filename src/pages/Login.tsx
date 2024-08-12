import { SubmitHandler } from "react-hook-form";
import { useUserData, useUserStore } from "../store/userStore";
import UserForm from "../components/UserForm";
import Toast from "../components/Toast";

type LoginInputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

function Login() {
  const { userData } = useUserData();
  const { loginUser } = useUserStore();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    if (userData) {
      const { email, password } = userData;
      if (data.email === email && data.password === password) {
        loginUser({
          id: 1,
          email: data.email,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Credenciales incorrectas",
        });
      }
    }
  };
  return (
    <div className="container login">
      <main className="">
        <h1 className="login-title">Exament Front</h1>
        <h2 className="login-title">Login</h2>
        <UserForm onSubmit={onSubmit} />
      </main>
    </div>
  );
}

export default Login;
