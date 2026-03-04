import { NavLink } from "react-router";
import emptyCartImg from "../../../assets/empty-cart.png";
import styles from "./EmptyCart.module.css";

export default function EmptyCart() {
  return (
    <main className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={emptyCartImg} alt="Empty Cart" />
      </div>
      <h2>Oops! Looks like your cart is empty</h2>
      <NavLink to="/products" className={styles.btn} viewTransition>
        Shop Now
      </NavLink>
    </main>
  );
}
