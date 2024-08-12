import { SubmitHandler } from "react-hook-form";
import UserForm from "../../components/UserForm";
import { LoginInputs } from "../../types/User";
import { useUserData } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Toast from "../../components/Toast";

function User() {
  const { setUserData } = useUserData();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    setUserData({
      email: data.email,
      password: data.password,
    });
    Toast.fire({
      icon: "success",
      title: "Credenciales actualizadas",
    });
    return navigate("/products");
  };
  return (
    <div className="container">
      <UserForm onSubmit={onSubmit} />
    </div>
  );
}

export default User;
