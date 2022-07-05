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

  useEffect(() => {
    const navBar = document.getElementById("navigation-bar");
    let rect = navBar.getBoundingClientRect();

    let scrolling = false;

    window.addEventListener("scroll", () => {
      scrolling = true;
    });

    setInterval(() => {
      if (scrolling) {
        scrolling = false;

        if (window.scrollY >= rect.top) {
          navBar.classList.add(styles["nav-Fixed"]);
        } else {
          navBar.classList.remove(styles["nav-Fixed"]);
        }
      }
    }, 100);
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
      <nav className={styles.nav} id="navigation-bar">
        <ul className={styles.list}>
          {screenSize > 700 ? <Nav /> : <MobileNav />}
        </ul>
        <span>Strona główna</span>
      </nav>
    </header>
  );
};

export default Header;
