import styles from "./Cart.module.css";
import useFetchCart from "../../hooks/useFetchCart";
import { useOutletContext } from "react-router";
import CartItem from "../../components/CartItem";
import CartItemSkeleton from "../../components/CartItem/CartItemSkeleton";
import generateBill from "../../helper/generateBill";
import Bill from "../../components/Bill.jsx";

const discountPercent = 10;
const shippingCharge = 1; // dollar

export default function Cart() {
  const { cart } = useOutletContext();
  const { data: cartItems, isLoading, error } = useFetchCart(cart);

  const bill = generateBill(cart, cartItems, discountPercent, shippingCharge);

  return (
    <main className={styles.container}>
      <div className={styles.cartContainer}>
        {isLoading && Object.keys(cart).map((id) => <CartItemSkeleton key={id} />)}
        {error && <div>{error}</div>}
        {!isLoading &&
          cartItems &&
          cartItems.map(
            (product) => product.id in cart && <CartItem product={product} key={product.id} />,
          )}
      </div>

      <Bill bill={bill} />
    </main>
  );
}
