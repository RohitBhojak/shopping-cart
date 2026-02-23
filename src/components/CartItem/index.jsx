import QuantityInput from "../QuantityInput";

export default function CartItem({ product }) {
  return (
    <div>
      <div>{product.title}</div>
      <div></div>
      <QuantityInput productId={product.id} />
    </div>
  );
}
