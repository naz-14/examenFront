import { useForm } from "react-hook-form";
import { LoginInputs } from "../../types/User";

type UserFormProps = {
  onSubmit: (data: LoginInputs) => void;
};

function UserForm({ onSubmit }: UserFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();
  const password = watch("password", "");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
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
        <label htmlFor="Password">Password</label>
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
        <label>Password Confirm</label>
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
      <input type="submit" />

      <div style={{ marginTop: "10px" }}>
        <p>El password debe cumplir con los siguientes requerimientos:</p>
        <p style={{ color: password.length >= 6 ? "green" : "red" }}>
          {password.length >= 6 ? "✔" : "✖"} Al menos 6 caracteres
        </p>
        <p
          style={{
            color:
              password.length > 0 && password.length <= 12 ? "green" : "red",
          }}
        >
          {password.length > 0 && password.length <= 12 ? "✔" : "✖"} Maximo 12
          caracteres
        </p>
        <p style={{ color: /[A-Z]/.test(password) ? "green" : "red" }}>
          {/[A-Z]/.test(password) ? "✔" : "✖"} Al menos una letra mayúscula
        </p>
        <p style={{ color: /[a-z]/.test(password) ? "green" : "red" }}>
          {/[a-z]/.test(password) ? "✔" : "✖"} Al menos una letra minúscula
        </p>
        <p style={{ color: /\d/.test(password) ? "green" : "red" }}>
          {/\d/.test(password) ? "✔" : "✖"} Al menos un número
        </p>
      </div>
      <div>
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>
      <div>
        {errors.passwordConfirm && (
          <p style={{ color: "red" }}>{errors.passwordConfirm.message}</p>
        )}
      </div>
    </form>
  );
}

export default UserForm;
