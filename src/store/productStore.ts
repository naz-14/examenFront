import { createJSONStorage, persist } from "zustand/middleware";
import { ProductData, ProductDataStore } from "../types/Product";
import { create } from "zustand";
import { decrypt, encrypt } from "../utils/storage";

export const useProductStore = create(
  persist<ProductDataStore>(
    (set) => ({
      productList: [],
      setProductsList: (productList: ProductDataStore["productList"]) =>
        set({ productList }),
      addProduct: (product: ProductData) => {
        return set((state) => {
          if (!state.productList) return { productList: [product] };
          return { productList: [...state.productList, product] };
        });
      },
      deleteProduct: (id: number) => {
        return set((state) => {
          return {
            productList: state.productList?.filter(
              (product) => product.id !== id
            ),
          };
        });
      },
    }),
    {
      name: "products",
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const encryptedData = localStorage.getItem(key);
          if (!encryptedData) return null;
          const decryptedData = decrypt(encryptedData);
          return JSON.parse(decryptedData);
        },
        setItem: (key, value) => {
          const encryptedData = encrypt(JSON.stringify(value));
          localStorage.setItem(key, encryptedData);
        },
        removeItem: (key) => localStorage.removeItem(key),
      })),
    }
  )
);
