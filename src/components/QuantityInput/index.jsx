import { useOutletContext } from "react-router";
import NumberInput from "../NumberInput";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function QuantityInput({ productId }) {
  const { cart, dispatch } = useOutletContext();
  const updateCart = (type) => {
    dispatch({ type, productId });
  };

  return productId in cart ? (
    <div>
      <button onClick={() => updateCart("decremented_count")} aria-label="Decrement quantity">
        <Minus />
      </button>
      <NumberInput key={cart[productId]} productId={productId} />
      <button onClick={() => updateCart("incremented_count")} aria-label="Increment quantity">
        <Plus />
      </button>
      <button onClick={() => updateCart("removed_from_cart")} aria-label="Remove from cart">
        <Trash2 />
      </button>
    </div>
  ) : (
    <button onClick={() => updateCart("added_to_cart")}>Add to Cart</button>
  );
}
