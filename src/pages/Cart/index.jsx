import styles from "./Cart.module.css";
import useFetchCart from "../../hooks/useFetchCart";
import { useOutletContext } from "react-router";
import CartItem from "../../components/CartItem";
import CartItemSkeleton from "../../components/CartItem/CartItemSkeleton";
import { formatINR } from "../../helper/currency";

export default function Cart() {
  const { cart } = useOutletContext();
  const { data: cartItems, isLoading, error } = useFetchCart(cart);

  const generateBill = (discount, shippingRaw) => {
    const subTotalRaw = cartItems.reduce((total, item) => total + item.price, 0);
    const totalRaw = subTotalRaw - (subTotalRaw * discount) / 100 + shippingRaw;
    const subTotal = formatINR(totalRaw);
    const total = formatINR(totalRaw);
    const shipping = formatINR(shippingRaw);
    return { subTotal, discount, shipping, total };
  };

  const bill = generateBill(15, 100);

  return (
    <main>
      <div className={styles.cartContainer}>
        {isLoading && Object.keys(cart).map((id) => <CartItemSkeleton key={id} />)}
        {error && <div>{error}</div>}
        {!isLoading &&
          cartItems &&
          cartItems.map(
            (product) => product.id in cart && <CartItem product={product} key={product.id} />,
          )}
      </div>

      <div className={styles.breakdown}>
        <div>
          <span>Subtotal</span>
          <span>{bill.subTotal}</span>
        </div>
        <div>
          <span>Discount</span>
          <span>{bill.discount}</span>
        </div>
        <div>
          <span>Shipping</span>
          <span>{bill.shipping}</span>
        </div>
        <div>
          <span>Total Amount</span>
          <span>{bill.total}</span>
        </div>
        <button>Checkout</button>
      </div>
    </main>
  );
}
