import React, { useState, useEffect } from "react";
import Nav from "./Nav/Nav";
import MobileNav from "./Nav/MobileNav";
import { ReactComponent as Logo } from "./img/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);

  return (
    <header className={styles.header}>
      <a
        className={styles["image-wrapper"]}
        href="index.html"
        title="Przejdź na stronę główną"
      >
        <Logo className={styles.logo} />
      </a>
      <nav>
        <ul className={styles.list}>
          {screenSize > 700 ? (
            <Nav />
          ) : (
            <MobileNav />
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
