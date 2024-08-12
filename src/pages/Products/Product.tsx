import { useNavigate, useParams } from "react-router-dom";
import useProductsData from "../../hooks/useProducts";
import { useState } from "react";

function Product({}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { productList } = useProductsData();
  const product = productList.find(
    (item) => item.id === parseInt(id || "", 10)
  );

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container">
      <div className="product-container">
        <div className="product-image-container">
          <h1 className="product-title">{product.title}</h1>
          <div
            style={{ display: loading ? "block" : "none" }}
            className="loader-container"
          >
            <div className="spinner"></div>
          </div>
          <div style={{ display: loading ? "none" : "block" }}>
            <img
              src={typeof product.image === "string" ? product.image : ""}
              alt={product.title}
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <div className="product-price-container">
            <h2 className="product-price">Price: </h2>
            <h2 className="product-price">${product.price}</h2>
          </div>
          <p className="product-description">
            <span>Description: </span>
            {product.description}
          </p>
        </div>
      </div>
      <div className="product-actions-container">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/product/create/" + product.id)}
        >
          <span className="circle1"></span>
          <span className="circle2"></span>
          <span className="circle3"></span>
          <span className="circle4"></span>
          <span className="circle5"></span>
          <span className="text">Editar producto</span>
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/products")}
        >
          <span className="circle1"></span>
          <span className="circle2"></span>
          <span className="circle3"></span>
          <span className="circle4"></span>
          <span className="circle5"></span>
          <span className="text">Atras</span>
        </button>
      </div>
    </div>
  );
}

export default Product;
