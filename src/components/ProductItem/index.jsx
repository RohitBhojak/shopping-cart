import QuantityInput from "../QuantityInput";
import { Rating } from "react-simple-star-rating";
import styles from "./ProductItem.module.css";
import currency from "currency.js";

export default function ProductItem({ product }) {
  const price = currency(product.price * 100, { symbol: "₹", useVedic: true }).format();
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} height={100} width={100} alt={product.title} />
      </div>
      <span>{product.title}</span>
      <div className={styles.ratingContainer}>
        <Rating
          initialValue={product.rating?.rate || 0}
          readonly={true}
          allowFraction={true}
          size={24}
          fillColor="var(--star-filled)"
          emptyColor="var(--star-empty)"
          SVGstyle={{ display: "inline" }}
        />
        <span>({product.rating?.count || 0})</span>
      </div>
      <span>{price}</span>
      <QuantityInput productId={product.id} />
    </div>
  );
}
