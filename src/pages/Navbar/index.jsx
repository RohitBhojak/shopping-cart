import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <h1 className={styles.title}>Linen</h1>
      <ul className={styles.list}>
        <li>
          <NavLink className={styles.listItem} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.listItem} to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.listItem} to="/cart">
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
