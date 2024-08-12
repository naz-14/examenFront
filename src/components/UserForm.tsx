import { useForm } from "react-hook-form";
import { LoginInputs } from "../types/User";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type UserFormProps = {
  onSubmit: (data: LoginInputs) => void;
};

function UserForm({ onSubmit }: UserFormProps) {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { pathname } = useLocation();
  console.log({ pathname });
  useEffect(() => {
    if (user) {
      setValue("email", user.email);
    }
  }, [user]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginInputs>();
  const password = watch("password", "");
  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Correo</label>
          <input
            type="email"
            {...register("email", {
              required: { message: "El correo es requerido", value: true },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El correo no es valido",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="Password">Contraseña</label>
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es requerida.",
              minLength: 6,
              maxLength: 12,
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Debe contener al menos una letra mayúscula.",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) ||
                  "Debe contener al menos una letra minúscula.",
                hasNumber: (value) =>
                  /\d/.test(value) || "Debe contener al menos un número.",
              },
            })}
          />
        </div>
        <div>
          <label>Confirma contraseña</label>
          <input
            type="password"
            {...register("passwordConfirm", {
              required: { message: "El password es requerido", value: true },
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Los passwords no coinciden";
                }
              },
            })}
          />
        </div>
        <div className="btn-container">
          <button type="submit" className="btn-primary">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">
              {pathname !== "/login" ? "Guardar cambios" : "Login"}
            </span>
          </button>
          {pathname !== "/login" && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/products")}
            >
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">Cancelar</span>
            </button>
          )}
        </div>
        {/* <input type="submit" className="btn-primary" /> */}

        <div style={{ marginTop: "10px" }}>
          <p>El password debe cumplir con los siguientes requerimientos:</p>
          <p
            style={{
              color: password.length >= 6 ? "green" : "red",
              marginTop: "10px",
            }}
          >
            {password.length >= 6 ? "✔" : "✖"} Al menos 6 caracteres
          </p>
          <p
            style={{
              color:
                password.length > 0 && password.length <= 12 ? "green" : "red",

              marginTop: "10px",
            }}
          >
            {password.length > 0 && password.length <= 12 ? "✔" : "✖"} Maximo 12
            caracteres
          </p>
          <p
            style={{
              color: /[A-Z]/.test(password) ? "green" : "red",
              marginTop: "10px",
            }}
          >
            {/[A-Z]/.test(password) ? "✔" : "✖"} Al menos una letra mayúscula
          </p>
          <p
            style={{
              color: /[a-z]/.test(password) ? "green" : "red",
              marginTop: "10px",
            }}
          >
            {/[a-z]/.test(password) ? "✔" : "✖"} Al menos una letra minúscula
          </p>
          <p
            style={{
              color: /\d/.test(password) ? "green" : "red",
              marginTop: "10px",
            }}
          >
            {/\d/.test(password) ? "✔" : "✖"} Al menos un número
          </p>
        </div>
        {Object.keys(errors).length > 0 && (
          <>
            <p style={{ margin: "10px 0" }}>
              No se pudo iniciar sesion por los siguientes errores:
            </p>
            <div>
              {errors.password && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              {errors.email && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              {errors.passwordConfirm && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default UserForm;
