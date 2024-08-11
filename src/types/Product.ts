export interface ProductData {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface ProductDataStore {
  productList: ProductData[];
  setProductsList: (productList: ProductData[]) => void;
  addProduct: (product: ProductData) => void;
  deleteProduct: (id: number) => void;
}
