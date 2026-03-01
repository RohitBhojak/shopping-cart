import { useState } from "react";
import styles from "./Bill.module.css";
import Modal from "../../../components/Modal";
import { useNavigate, useOutletContext } from "react-router";
import { Check } from "lucide-react";

export default function Bill({ bill }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useOutletContext();

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

      <button className={styles.btn} onClick={() => setIsOpen(true)}>
        Checkout
      </button>

      {/* Checkout Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.modalContent}>
          <div className={styles.check}>
            <Check size={32} />
          </div>
          <h2>Thanks for shopping with us!</h2>
          <button
            className={styles.btn}
            onClick={() => {
              dispatch({ type: "empty_cart" });
              navigate("/products", { viewTransition: true });
            }}
          >
            Continue Shopping
          </button>
        </div>
      </Modal>
    </div>
  );
}
