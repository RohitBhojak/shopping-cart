import { useReducer } from "react";
import countReducer from "../../reducers/countReducer";

export default function ProductItem({ product }) {
  const [count, dispatch] = useReducer(countReducer, null);
  return (
    <div>
      <img src={product.image} height={100} width={100} />
      <span>{product.title}</span>
      <span>{product.price}</span>

      {count === null ? (
        <button onClick={() => dispatch({ type: "added_to_cart" })}>Add to Cart</button>
      ) : (
        <div>
          <button onClick={() => dispatch({ type: "decremented_count" })}>-</button>
          <input
            inputMode="numeric"
            value={count}
            min={0}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^\d+$/.test(value))
                return dispatch({ type: "change_count", count: value });
            }}
            onBlur={(e) => dispatch({ type: "set_count", count: e.target.value })}
          />
          <button onClick={() => dispatch({ type: "incremented_count" })}>+</button>
        </div>
      )}
    </div>
  );
}
