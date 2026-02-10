import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.container}>
      <h1 className={styles.title}>Linen</h1>
      <ul className={`${styles.list} ${isOpen ? styles.open : ""}`}>
        <li>
          <NavLink className={styles.listItem} to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.listItem} to="/products" onClick={closeMenu}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.listItem} to="/cart" onClick={closeMenu}>
            Cart
          </NavLink>
        </li>
      </ul>
      <div className={styles.actions}>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
        <button className={styles.menuButton} onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}
