import ProductForm from "../../components/ProductForm";

function NewProduct() {
  return (
    <div>
      <ProductForm onSubmit={(product) => console.log(product)} />
    </div>
  );
}

export default NewProduct;
