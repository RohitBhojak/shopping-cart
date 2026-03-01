import styles from "./Cart.module.css";
import useFetchCart from "../../hooks/useFetchCart";
import { useOutletContext } from "react-router";
import CartItem from "./CartItem";
import CartItemSkeleton from "./CartItem/CartItemSkeleton";
import generateBill from "../../helper/generateBill";
import Bill from "./Bill";
import BillSkeleton from "./Bill/BillSkeleton.jsx";
import EmptyCart from "./EmptyCart";

const discountPercent = 10;
const shippingCharge = 1; // dollar

export default function Cart() {
  const { cart } = useOutletContext();
  const { data: cartItems, isLoading, error } = useFetchCart(cart);

  if (cart && Object.keys(cart).length === 0) return <EmptyCart />;

  const bill =
    !isLoading && cartItems ? generateBill(cart, cartItems, discountPercent, shippingCharge) : null;

  return (
    <main className={styles.container}>
      <div className={styles.cartContainer}>
        {isLoading && Object.keys(cart).map((id) => <CartItemSkeleton key={id} />)}
        {error && <div>{error}</div>}
        {!isLoading &&
          cartItems?.map(
            (product) => product.id in cart && <CartItem product={product} key={product.id} />,
          )}
      </div>

      {isLoading ? <BillSkeleton /> : <Bill bill={bill} />}
    </main>
  );
}
