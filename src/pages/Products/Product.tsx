import { useParams } from "react-router-dom";
import useProductsData from "../../hooks/useProducts";

function Product({}) {
  const { id } = useParams();
  const { productList } = useProductsData();
  const product = productList.find(
    (item) => item.id === parseInt(id || "", 10)
  );

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <img src={product.image} alt={product.title} />
    </div>
  );
}

export default Product;
