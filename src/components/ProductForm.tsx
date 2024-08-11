import { useForm } from "react-hook-form";
import { Product } from "../types/Product";

type ProductFormProps = {
  onSubmit: (data: Product) => void;
};

function ProductForm({ onSubmit }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Product>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Titulo del producto</label>
        <input
          type="text"
          {...register("title", {
            required: {
              message: "El nombre del producto es requerido",
              value: true,
            },
          })}
        />
      </div>
      <div>
        <label htmlFor="Price">Precio</label>
        <input
          type="number"
          {...register("price", {
            required: "El precio es requerida.",
            validate: {
              onlyPositive: (value) =>
                parseInt(value) > 0 || "El valor debe ser positivo.",
            },
          })}
        />
      </div>
      <div>
        <label htmlFor="Description">Descripcion</label>
        <input
          type="area"
          {...register("description", {
            required: "La descripción es requerida.",
            validate: {
              onlyPositive: (value) =>
                parseInt(value) > 0 || "El valor debe ser positivo.",
            },
          })}
        />
      </div>
      <div>
        <label htmlFor="Category">Categoría</label>
        <input
          type="text"
          {...register("category", {
            required: "La categoría es requerida.",
          })}
        />
      </div>
      <div>
        <label htmlFor="Image">Imagen</label>
        <input
          type="file"
          {...register("image", { required: "la imagen es requerida" })}
        />
      </div>
      <input type="submit" />

      <div>
        {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
      </div>
      <div>
        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
      </div>
    </form>
  );
}

export default ProductForm;
