export interface Product {
  id?: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: File[] | string;
}
export interface ProductData extends Product {
  id: number;
}

export interface UpdateProduct extends ProductData {
  actualImage: string;
}

export interface ProductDataStore {
  productList: ProductData[];
  setProductsList: (productList: ProductData[]) => void;
  addProduct: (product: ProductData) => void;
  updateProduct: (product: ProductData) => void;
  deleteProduct: (id: number) => void;
}
