import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";

const useProductsData = () => {
  const [loading, setLoading] = useState(false);
  const { setProductsList, productList } = useProductStore();

  useEffect(() => {
    if (productList) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        const json = await response.json();
        setProductsList(json);
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
        const response = await fetch("https://fakestoreapi.com/products/");
        const json = await response.json();
        setProductsList(json);
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
