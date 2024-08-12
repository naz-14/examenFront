import axios from "axios";
import { Product } from "../types/Product";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
  },
});

export const fetchProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

export const createProduct = async (product: Product) => {
  if (product.image[0] instanceof File) {
    product.image = "https://" + product.image[0].name;
  }
  const response = await apiClient.post("/products", {
    title: product.title,
    price: product.price,
    description: product.description,
    image: product.image,
    category: product.category,
  });
  return response.data;
};
