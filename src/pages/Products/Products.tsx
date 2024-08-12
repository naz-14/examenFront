import useProductsData from "../../hooks/useProducts";
import useSorting from "../../hooks/useSorting";
import usePagination from "../../hooks/usePagination";
import useFilter from "../../hooks/useFilter";
import highlightText from "../../components/HightlightText";
import { useNavigate } from "react-router-dom";

// Definimos una interfaz para los datos de la tabla

const TableComponent: React.FC = () => {
  const navigate = useNavigate();
  const itemsPerPage = 1;
  const { productList, loading: loadingData } = useProductsData();
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
    <div className="container">
      <h2 style={{ marginTop: "20px" }}>Product list</h2>

      {/* <button onClick={refreshData}>Refresh Data</button> */}
      <input
        type="text"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Filter by name"
      />
      <div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>
                <button
                  onClick={() => {
                    handleSort("title");
                    setCurrentPage(1);
                  }}
                  className="unstyled-button"
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
                  className="unstyled-button"
                >
                  Price{" "}
                  {sortColumn === "price"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {productList &&
              currentData.map((item) => (
                <>
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <td>
                      <span>{highlightText(item.title, filter)}</span>
                    </td>
                    <td>
                      <span>${item.price}</span>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>

          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(item)}
              className={`pagination-button ${
                currentPage === item ? "active" : ""
              }`}
            >
              {item}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
