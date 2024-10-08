import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../../store/productStore";
import { UpdateProduct as IUpdateProduct } from "../../types/Product";
import UpdateProductForm from "../../components/UpdateProductForm";
import Toast from "../../components/Toast";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productList, updateProduct: updateProductStore } = useProductStore();
  const onSubmit = async (data: IUpdateProduct) => {
    let productData = { ...data };
    if (data.image[0] instanceof File) {
      const imageFile = data.image[0];
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        productData = {
          ...data,
          price: `${parseFloat(data.price)}`,
          image: base64String,
        };
        updateProductStore(productData);
      };
      await Toast.fire({
        icon: "success",
        title: "Producto Actualizado",
      });
      navigate("/product/" + id);
    } else {
      const imageFile = productList.find(
        (p) => p.id === parseInt(id || "", 10)
      )?.image;
      updateProductStore({
        ...data,
        price: `${parseFloat(data.price)}`,
        image: imageFile || "",
      });
      Toast.fire({
        icon: "success",
        title: "Producto Actualizado",
      });
      navigate("/product/" + id);
    }
  };
  return (
    <div className="container">
      <h1 className="product-form-title">Edicion de Producto</h1>
      <UpdateProductForm
        onSubmit={onSubmit}
        productId={id ? parseInt(id) : 0}
      />
    </div>
  );
}

export default UpdateProduct;
