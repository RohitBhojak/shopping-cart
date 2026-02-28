import { formatINR } from "./currency";

export default function generateBill(cart, cartItems, discountPercent, shippingRaw) {
  const subTotalRaw = cartItems.reduce((total, item) => total + item.price * cart[item.id], 0);
  const discountRaw = (subTotalRaw * discountPercent) / 100;
  const totalRaw = subTotalRaw - discountRaw + shippingRaw;

  return {
    items: [
      { label: "Subtotal", value: formatINR(subTotalRaw) },
      { label: "Discount", value: `-${formatINR(discountRaw)}` },
      { label: "Shipping", value: formatINR(shippingRaw) },
    ],
    total: formatINR(totalRaw),
  };
}
