import { useRouteError, isRouteErrorResponse, NavLink } from "react-router";
import errorImg from "../../assets/error-page.png";
import styles from "./ErrorPage.module.css";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";

export default function ErrorPage() {
  const error = useRouteError();
  const [theme] = useState(() => localStorage.getItem("theme") || "light");

  useTheme(theme);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={errorImg} alt="Error" />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.heading}>Oops!</h2>
        <p className={styles.subHeading}>
          Sorry, an unexpected error has occurred.
          <br />
          <i>
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
