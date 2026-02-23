import styles from "./Cart.module.css";
import useFetchCart from "../../hooks/useFetchCart";
import { useOutletContext } from "react-router";
import CartItem from "../../components/CartItem";
import CartItemSkeleton from "../../components/CartItem/CartItemSkeleton";

export default function Cart() {
  const { cart } = useOutletContext();
  const { data: cartItems, isLoading, error } = useFetchCart(cart);

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
          <span>price</span>
        </div>
        <div>
          <span>Discount</span>
          <span>price</span>
        </div>
        <div>
          <span>Shipping</span>
          <span>price</span>
        </div>
        <div>
          <span>Total Amount</span>
          <span>price</span>
        </div>
        <button>Checkout</button>
      </div>
    </main>
  );
}
