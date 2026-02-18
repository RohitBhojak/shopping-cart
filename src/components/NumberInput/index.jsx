import { useState } from "react";
import { useOutletContext } from "react-router";
import styles from "./NumberInput.module.css";

export default function NumberInput({ productId }) {
  const { cart, dispatch } = useOutletContext();
  const [count, setCount] = useState(cart[productId] || "");
  return (
    <input
      aria-label="Quantity"
      inputMode="numeric"
      value={count}
      className={styles.input}
      onChange={(e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) setCount(value); // Only 0 or more digits are allowed
      }}
      onBlur={(e) => dispatch({ type: "set_count", count: e.target.value, productId })}
    />
  );
}
