import React from "react";
import CookieConsent from "react-cookie-consent";

import styles from "./Cookies.module.css";

const Cookies = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Akceptuj"
      buttonStyle={{
        borderRadius: "20px",
        background: "#fdb06f",
        width: "fit-content",
        padding: "0.6em 1em",
        border: "none",
        fontSize: "1rem",
        transition: "200ms ease",
      }}
      buttonClasses={styles.consent}
    >
      Ta strona wymaga plików cookies do prawidłowego działania.
    </CookieConsent>
  );
};

export default Cookies;
