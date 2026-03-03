import { NavLink } from "react-router";
import hero from "../../assets/hero.png";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.heading}>
          ONLINE <span className={styles.highlight}>SHOPPING</span>
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi sit minus, earum cumque
          veniam incidunt architecto. Veritatis earum laudantium blanditiis fuga at. Dolores libero
          aliquam necessitatibus, modi qui error quaerat.
        </p>
        <NavLink className={styles.btn} to="/products" viewTransition>
          Shop Now
        </NavLink>
      </div>
      <div className={styles.imageContainer}>
        <img src={hero} alt="Hero image" />
      </div>
    </main>
  );
}
