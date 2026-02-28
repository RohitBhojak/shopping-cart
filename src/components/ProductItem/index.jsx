import QuantityInput from "../QuantityInput";
import { Rating } from "react-simple-star-rating";
import styles from "./ProductItem.module.css";
import { formatINR } from "../../helper/currency";

export default function ProductItem({ product }) {
  const price = formatINR(product.price);
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.image} height={100} width={100} alt={product.title} />
      </div>
      <div className={styles.title}>{product.title}</div>
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
