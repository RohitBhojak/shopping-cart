import { useReducer } from "react";
import countReducer from "../../reducers/countReducer";
import { useOutletContext } from "react-router";

export default function ProductItem({ product }) {
  const { cart, setCart } = useOutletContext();
  const [count, dispatch] = useReducer(countReducer, cart[product.id]?.count || null);
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
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^\d+$/.test(value))
                return dispatch({ type: "change_count", count: value });
            }}
            onBlur={(e) => dispatch({ type: "set_count", count: e.target.value })}
          />
          <button onClick={() => dispatch({ type: "incremented_count" })}>+</button>
          <button onClick={() => dispatch({ type: "delete" })}>Delete</button>
        </div>
      )}
    </div>
  );
}
