export default function cartReducer(cart, action) {
  const pid = action.productId;

  const updateCount = (count) => {
    if (count) return { ...cart, [pid]: count };
    const { [pid]: _, ...newCart } = cart;
    return newCart;
  };

  switch (action.type) {
    case "added_to_cart":
      return updateCount(1);

    case "incremented_count":
      return updateCount(Number(cart[pid]) + 1);

    case "decremented_count":
      return updateCount(Number(cart[pid]) - 1);

    case "set_count":
      return updateCount(Number(action.count));

    case "deleted_from_cart":
      return updateCount(0);

    default:
      return cart;
  }
}
