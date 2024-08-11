export interface ProductData extends Product {
  id: number;
}
export interface Product {
  title: string;
  price: string;
  category: string;
  description: string;
  image: File[] | string;
}

export interface ProductDataStore {
  productList: ProductData[];
  setProductsList: (productList: ProductData[]) => void;
  addProduct: (product: ProductData) => void;
  deleteProduct: (id: number) => void;
}
