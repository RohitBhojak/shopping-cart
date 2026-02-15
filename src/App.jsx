import { Outlet } from "react-router";
import Navbar from "./pages/Navbar";
import { useState } from "react";
import useTheme from "./hooks/useTheme";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [cart, setCart] = useState(localStorage.getItem("cart") || {});

  useTheme(theme);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Outlet context={{ cart, setCart }} />
    </>
  );
}
