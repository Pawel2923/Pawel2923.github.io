import React, { useState, useEffect } from "react";
import Nav from "./Nav/Nav";
import MobileNav from "./Nav/MobileNav";
import { ReactComponent as Logo } from "./img/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    let resizing = false;

    window.addEventListener("resize", () => {
      resizing = true;
    });

    setInterval(() => {
      if (resizing) {
        resizing = false;

        setScreenSize(window.innerWidth);
      }
    }, 100);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} id="navigation-bar">
        <ul className={styles.list}>
          {screenSize > 700 ? <Nav /> : <MobileNav />}
        </ul>
        <span>
          <a
            className={styles["image-wrapper"]}
            href="index.html"
            title="Przejdź na stronę główną"
          >
            <Logo className={styles.logo} />
          </a>
        </span>
      </nav>
    </header>
  );
};

export default Header;
