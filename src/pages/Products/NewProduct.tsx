import ProductForm from "../../components/ProductForm";
import { Product } from "../../types/Product";
import { useProductStore } from "../../store/productStore";
import { randomId } from "../../utils/randomId";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/apiServices";

function NewProduct() {
  const navigate = useNavigate();
  const { addProduct, productList } = useProductStore();
  const onSubmit = async (data: Product) => {
    let productData = { ...data };
    if (data.image[0] instanceof File) {
      const imageFile = data.image[0];
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      const productIds = productList.map((product) => product.id);
      const id = randomId(productIds);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        productData = { ...data, image: base64String };
        addProduct({ ...productData, id });
      };
      try {
        const createdProduct = await createProduct(productData);
        console.log({ createdProduct });
      } catch (error) {
        console.error(error);
      }
      navigate("/product/" + id);
    } else {
      console.error("La imagen proporcionada no es un archivo válido.");
    }
  };
  return (
    <div>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
}

export default NewProduct;
