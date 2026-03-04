import { NavLink } from "react-router";
import styles from "./Home.module.css";

export default function Home() {
  const imgPath = "/hero/hero_lgd7zi_c_scale,w_";
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
        <img
          className={styles.heroImage}
          src={`${imgPath}2800.png`}
          alt="Online Shopping Hero"
          width="2800"
          height="2472"
          fetchpriority="high"
          sizes="(max-width: 768px) 100vw, 50vw"
          srcSet={`
            ${imgPath}200.png 200w,
            ${imgPath}1349.png 1349w,
            ${imgPath}2019.png 2019w,
            ${imgPath}2446.png 2446w,
            ${imgPath}2800.png 2800w
          `}
        />
      </div>
    </main>
  );
}
