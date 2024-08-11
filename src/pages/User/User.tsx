import { SubmitHandler } from "react-hook-form";
import UserForm from "../../components/UserForm";
import { LoginInputs } from "../../types/User";
import { useUserData } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

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
