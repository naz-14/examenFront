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
  console.log({ productList });

  if (!productList || loadingData) return <div>Loading...</div>;
  return (
    <div className="container">
      {/* <button onClick={refreshData}>Refresh Data</button> */}
      <h2 style={{ marginTop: "20px" }}>Lista de productos</h2>
      <div className="list-btn-container" style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Filtrar por nombre"
        />
        <button
          className="btn-primary"
          onClick={() => navigate("/product/create")}
        >
          Crear producto
        </button>
      </div>
      <div className="table-container">
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
      </div>
      <div className="pagination-container">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          {"<"}
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
          {">"}
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
