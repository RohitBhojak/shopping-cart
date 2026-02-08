import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];

export default routes;
