import { Outlet } from "react-router";
import Navbar from "./pages/Navbar";
import { useState, useEffect } from "react";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Outlet />
    </>
  );
}
