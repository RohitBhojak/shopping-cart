import { useOutletContext } from "react-router";
import NumberInput from "../NumberInput";

export default function QuantityInput({ productId }) {
  const { cart, dispatch } = useOutletContext();
  const updateCart = (type) => {
    dispatch({ type, productId });
  };

  return cart[productId] ? (
    <button onClick={() => updateCart("added_to_cart")}>Add to Cart</button>
  ) : (
    <div>
      <button onClick={() => updateCart("decremented_count")}>-</button>
      <NumberInput productId={productId} />
      <button onClick={() => updateCart("incremented_count")}>+</button>
      <button onClick={() => updateCart("deleted_from_cart")}>Delete</button>
    </div>
  );
}
