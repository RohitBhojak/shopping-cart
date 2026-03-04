import { useRouteError, isRouteErrorResponse, NavLink } from "react-router";
import styles from "./ErrorPage.module.css";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";

export default function ErrorPage() {
  const imgPath = "/error-page/error-page_thnxps_c_scale,w_";

  const error = useRouteError();
  const [theme] = useState(() => localStorage.getItem("theme") || "light");

  useTheme(theme);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.heroImage}
          src={`${imgPath}2800.png`}
          alt="Error illustration"
          width="2800"
          height="2196"
          sizes="(max-width: 768px) 100vw, 50vw"
          srcSet={`
                    ${imgPath}200.png 200w,
                    ${imgPath}1340.png 1340w,
                    ${imgPath}2006.png 2006w,
                    ${imgPath}2439.png 2439w,
                    ${imgPath}2800.png 2800w
                  `}
        />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.heading}>Oops!</h2>
        <p className={styles.subHeading}>
          Sorry, an unexpected error has occurred.
          <br />
          <i className={styles.highlight}>
            {isRouteErrorResponse(error)
              ? `${error.status} ${error.statusText}`
              : error.message || "Unknown Error"}
          </i>
        </p>
        <NavLink className={styles.btn} to="/" viewTransition>
          Go Home
        </NavLink>
      </div>
    </div>
  );
}
