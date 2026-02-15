import { Outlet } from "react-router";
import Navbar from "./pages/Navbar";
import { useReducer, useState } from "react";
import useTheme from "./hooks/useTheme";
import cartReducer from "./reducers/cartReducer";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [cart, dispatch] = useReducer(cartReducer, JSON.parse(localStorage.getItem("cart")) || {});

  useTheme(theme);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Outlet context={{ cart, dispatch }} />
    </>
  );
}
