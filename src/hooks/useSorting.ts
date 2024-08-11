import { useState } from "react";

const useSorting = <T>(
  data: T[],
  initialSortColumn: keyof T,
  initialSortOrder: "asc" | "desc"
) => {
  const [sortColumn, setSortColumn] = useState<keyof T>(initialSortColumn);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSortOrder);

  const sortedData = data.slice().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return {
    sortedData,
    sortColumn,
    sortOrder,
    handleSort,
  };
};

export default useSorting;
