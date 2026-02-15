import { useState } from "react";
import { useOutletContext } from "react-router";

export default function NumberInput({ productId }) {
  const { dispatch } = useOutletContext();
  const [count, setCount] = useState();
  <input
    inputMode="numeric"
    value={count}
    onChange={(e) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) setCount(value);
    }}
    onBlur={(e) => dispatch({ type: "set_count", count: e.target.value, productId })}
  />;
}
