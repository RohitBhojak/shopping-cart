import { Outlet } from "react-router";
import Navbar from "./pages/Navbar";
import { useEffect, useReducer, useState } from "react";
import useTheme from "./hooks/useTheme";
import cartReducer from "./reducers/cartReducer";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [cart, dispatch] = useReducer(
    cartReducer,
    {},
    () => JSON.parse(localStorage.getItem("cart")) || {},
  );

  useTheme(theme);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} cartSize={Object.keys(cart).length} />
      <Outlet context={{ cart, dispatch }} />
    </>
  );
}
