import styles from "./Bill.module.css";

export default function Bill({ bill }) {
  return (
    <div className={styles.container}>
      {bill.items.map((item) => (
        <div key={item.label} className={styles.detail}>
          <span>{item.label}</span>
          <span>{item.value}</span>
        </div>
      ))}

      <hr />

      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{bill.total}</span>
      </div>

      <button className={styles.btn}>Checkout</button>
    </div>
  );
}
