import useProductsData from "../../hooks/useProducts";
import useSorting from "../../hooks/useSorting";
import usePagination from "../../hooks/usePagination";
import useFilter from "../../hooks/useFilter";
import highlightText from "../../components/HightlightText";
import { Link } from "react-router-dom";

// Definimos una interfaz para los datos de la tabla

const TableComponent: React.FC = () => {
  const itemsPerPage = 1;
  const { productList, refreshData, loading: loadingData } = useProductsData();
  const { filter, filteredData, setFilter } = useFilter(productList, "");
  const { sortedData, handleSort, sortColumn, sortOrder } = useSorting(
    filteredData,
    "title",
    "asc"
  );
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentData,
    getPaginationGroup,
  } = usePagination(sortedData, itemsPerPage);

  if (!productList || loadingData) return <div>Loading...</div>;
  return (
    <div>
      <button onClick={refreshData}>Refresh Data</button>
      <input
        type="text"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Filter by name"
      />
      <table>
        <thead>
          <tr>
            <th>
              <button
                onClick={() => {
                  handleSort("title");
                  setCurrentPage(1);
                }}
              >
                Name{" "}
                {sortColumn === "title"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  handleSort("price");
                  setCurrentPage(1);
                }}
              >
                Price{" "}
                {sortColumn === "price"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </button>
            </th>
            <th>
              <p>Actions</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {productList &&
            currentData.map((item) => (
              <tr key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <td>{highlightText(item.title, filter)}</td>
                  <td>{item.price}</td>
                </Link>
                <td>
                  <Link to={`/product/create/${item.id}`}>edit</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(item)}
          className={currentPage === item ? "active" : ""}
        >
          {item}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default TableComponent;
