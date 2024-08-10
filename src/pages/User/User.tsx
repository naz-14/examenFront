import { SubmitHandler } from "react-hook-form";
import UserForm from "./UserForm";
import { LoginInputs } from "../../types/User";
import { useUserData } from "../../store/userStore";
import { Navigate, useNavigate } from "react-router-dom";

function User() {
  const { setUserData } = useUserData();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    setUserData({
      email: data.email,
      password: data.password,
    });
    return navigate("/products");
  };
  return (
    <div>
      <UserForm onSubmit={onSubmit} />
    </div>
  );
}

export default User;
