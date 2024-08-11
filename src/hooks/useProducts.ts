import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { fetchProducts } from "../services/apiServices";

const useProductsData = () => {
  const [loading, setLoading] = useState(false);
  const { setProductsList, productList } = useProductStore();

  useEffect(() => {
    if (productList) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setProductsList(products);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const refreshData = () => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setProductsList(products);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };
    fetchData();
  };

  return { productList, refreshData, loading };
};

export default useProductsData;
