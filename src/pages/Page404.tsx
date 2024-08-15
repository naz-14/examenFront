import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();
  return (
    <div className="container-404">
      <div className="container content-404">
        <h1>La pagina que buscas no existe</h1>
        <button
          className="btn-primary"
          type="button"
          onClick={() => navigate("/")}
        >
          Ir al inicio
        </button>
      </div>
    </div>
  );
}

export default Page404;
