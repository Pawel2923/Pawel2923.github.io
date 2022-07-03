import React from "react";
import Nav from "./Nav/Nav";
import { ReactComponent as Logo } from "./img/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <a
        className={styles["image-wrapper"]}
        href="index.html"
        title="Przejdź na stronę główną"
      >
        <Logo className={styles.logo} />
      </a>
      <Nav />
    </header>
  );
};

export default Header;
