import { SubmitHandler } from "react-hook-form";
import { useUserData, useUserStore } from "../store/userStore";
import UserForm from "./User/UserForm";

type LoginInputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

function Login() {
  const { userData } = useUserData();
  const { loginUser } = useUserStore();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    //TODO: Implementar login en zustand
    if (userData) {
      const { email, password } = userData;
      if (data.email === email && data.password === password) {
        loginUser({
          id: 1,
          email: data.email,
        });
      }
    }
  };
  return (
    <main>
      <UserForm onSubmit={onSubmit} />
    </main>
  );
}

export default Login;
