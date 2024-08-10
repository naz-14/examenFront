import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./router/ProtectedRoute";
import Products from "./pages/Products/Products";
import Product from "./pages/Products/Product";
import NewProduct from "./pages/Products/NewProduct";
import { useEffect } from "react";
import { useUserData, useUserStore } from "./store/userStore";
import User from "./pages/User/User";
import Home from "./pages/Home";

function App() {
  const { user } = useUserStore();
  const { setUserData, userData } = useUserData();
  useEffect(() => {
    if (!userData) {
      setUserData({
        email: "demo@demo.com",
        password: "Demo1234",
      });
    }
  }, []);
  console.log({ user });
  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
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
