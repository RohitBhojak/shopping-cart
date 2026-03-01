import QuantityInput from "../QuantityInput";
import styles from "./CartItem.module.css";
import { formatINR } from "../../helper/currency";

export default function CartItem({ product }) {
  const price = formatINR(product.price);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.title}>{product.title}</span>
        <span>{price}</span>
      </div>
      <div className={styles.buttonContainer}>
        <QuantityInput productId={product.id} column={true} />
      </div>
    </div>
  );
}
