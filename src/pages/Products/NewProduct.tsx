import ProductForm from "../../components/ProductForm";
import { Product } from "../../types/Product";
import { useProductStore } from "../../store/productStore";
import { randomId } from "../../utils/randomId";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct } from "../../services/apiServices";
import Toast from "../../components/Toast";
import { useState } from "react";
import LoadingOverlay from "../../components/LoadingOverlay";

function NewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { addProduct, productList } = useProductStore();
  const onSubmit = async (data: Product) => {
    setLoading(true);
    let productData = { ...data };
    if (data.image[0] instanceof File) {
      const imageFile = data.image[0];
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      const productIds = productList.map((product) => product.id);
      const id = randomId(productIds);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        productData = {
          ...data,
          price: `${parseFloat(data.price)}`,
          image: base64String,
        };
        addProduct({ ...productData, id });
      };
      try {
        const createdProduct = await createProduct(productData);
        console.log(createdProduct);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
      Toast.fire({
        icon: "success",
        title: "Producto Creado",
      });
      navigate("/product/" + id);
    } else if (typeof data.image === "string" && data.id) {
      addProduct({
        ...productData,
        price: `${parseFloat(data.price)}`,
        id: data.id,
      });
      try {
        const createdProduct = await createProduct(productData);
        console.log(createdProduct);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
      Toast.fire({
        icon: "success",
        title: "Producto Creado",
      });
      navigate("/product/" + id);
    } else {
      console.error("La imagen proporcionada no es un archivo válido.");
    }
  };
  return (
    <div className="container">
      {loading && <LoadingOverlay />}
      <h1 className="product-form-title">Nuevo producto</h1>
      <h2 className="product-form-instruction">
        Ingresa los datos del nuevo producto
      </h2>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
}

export default NewProduct;
