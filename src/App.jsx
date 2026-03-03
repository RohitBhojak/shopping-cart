import { Outlet } from "react-router";
import Navbar from "./pages/Navbar";
import { useReducer, useState } from "react";
import useTheme from "./hooks/useTheme";
import cartReducer from "./reducers/cartReducer";
import useStorage from "./hooks/useStorage";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [cart, dispatch] = useReducer(
    cartReducer,
    {},
    () => JSON.parse(localStorage.getItem("cart")) || {},
  );

  useTheme(theme);
  useStorage(cart);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const cartSize = Object.keys(cart).reduce((total, item) => total + cart[item], 0);

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} cartSize={cartSize} />
      <Outlet context={{ cart, dispatch }} />
    </>
  );
}
