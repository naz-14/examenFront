import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./router/ProtectedRoute";
import Products from "./pages/Products/Products";
import Product from "./pages/Products/Product";
import NewProduct from "./pages/Products/NewProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/products/:id" element={<NewProduct />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
