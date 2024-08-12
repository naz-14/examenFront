import { useForm } from "react-hook-form";
import { UpdateProduct } from "../types/Product";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useNavigate } from "react-router-dom";

type ProductFormProps = {
  onSubmit: (data: UpdateProduct) => void;
  productId: number;
};

function UpdateProductForm({ onSubmit, productId }: ProductFormProps) {
  const navigate = useNavigate();
  const { productList, deleteProduct } = useProductStore();
  const [product, setProduct] = useState<UpdateProduct>({} as UpdateProduct);
  useEffect(() => {
    const product = productList.find((product) => product.id === productId);
    if (!product) return;
    setProduct({ ...product, actualImage: product.image as string });
    setValue("id", product.id);
    setValue("title", product.title);
    setValue("price", product.price);
    setValue("description", product.description);
    setValue("category", product.category);
    setValue("actualImage", product.image as string);
  }, [productList]);

  const handleDeleteProduct = () => {
    deleteProduct(productId);
    navigate("/products");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProduct>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Titulo del producto</label>
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
        <label htmlFor="Price">Precio</label>
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
        <label htmlFor="Description">Descripcion</label>
        <textarea
          rows={5}
          {...register("description", {
            required: "La descripción es requerida.",
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
        <label htmlFor="Image">Imagen actual</label>
        <img src={typeof product.image === "string" ? product.image : ""} />
        <input type="hidden" {...register("actualImage")} />
      </div>
      <div>
        <label htmlFor="Image">Imagen</label>
        <input type="file" accept="image/*" {...register("image")} />
      </div>
      <input type="submit" />

      <button onClick={handleDeleteProduct}>Delete</button>

      <div>
        {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
      </div>
      <div>
        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
      </div>
      <div>
        {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
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
    </form>
  );
}

export default UpdateProductForm;
