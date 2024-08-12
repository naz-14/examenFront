import { useForm } from "react-hook-form";
import { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";

type ProductFormProps = {
  onSubmit: (data: Product) => void;
};

function ProductForm({ onSubmit }: ProductFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();
  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Titulo del producto*</label>
          <input
            type="text"
            {...register("title", {
              required: {
                message: "El nombre del producto es requerido.",
                value: true,
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="Price">Precio*</label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "El precio es requerido.",
              validate: {
                onlyPositive: (value) =>
                  parseInt(value) > 0 || "El valor debe ser positivo.",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="Description">Descripcion*</label>
          <textarea
            rows={5}
            {...register("description", {
              required: "La descripción es requerida.",
            })}
          />
        </div>
        <div>
          <label htmlFor="Category">Categoría*</label>
          <input
            type="text"
            {...register("category", {
              required: "La categoría es requerida.",
            })}
          />
        </div>
        <div>
          <label htmlFor="Image">Imagen*</label>
          <input
            type="file"
            {...register("image", {
              required: "la imagen es requerida.",
              validate: {
                isImage: (files) => {
                  const file = files[0];
                  const validImageTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "image/avif",
                  ];
                  return (
                    (file instanceof File &&
                      validImageTypes.includes(file.type)) ||
                    "Solo se permiten imágenes (jpeg, png, webp, avif)."
                  );
                },
              },
            })}
          />
        </div>
        <div>
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
        </div>
        <div>
          {errors.price && (
            <p style={{ color: "red" }}>{errors.price.message}</p>
          )}
        </div>
        <div>
          {errors.image && (
            <p style={{ color: "red" }}>{errors.image.message}</p>
          )}
        </div>
        <div>
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}
        </div>
        <div>
          {errors.category && (
            <p style={{ color: "red" }}>{errors.category.message}</p>
          )}
        </div>
        <div className="btn-container">
          <button type="submit" className="btn-primary">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Crear</span>
          </button>
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
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
