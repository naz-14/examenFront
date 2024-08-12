import { useState } from "react";
import { ProductData } from "../types/Product";

const useFilter = (data: ProductData[], initialFilter: string = "") => {
  const [filter, setFilter] = useState<string>(initialFilter);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  return { filteredData, filter, setFilter };
};

export default useFilter;
