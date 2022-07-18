import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import styles from "./MobileNav.module.css";
import optionStyles from "./Option.module.css";
import { ReactComponent as Logo } from "../img/logo.svg";

export const NavOverlay = (props) => {
  const closeHandler = () => {
    props.closeHandler();
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <nav>
        <div className={styles.close}>
          <i className="fa-solid fa-xmark" onClick={closeHandler}></i>
          <Link to="/home" className={styles["image-wrapper"]}>
            <Logo />
          </Link>
        </div>
        <ul>
          <li className={optionStyles.option}>
            <Link to="/home" onClick={closeHandler}>
              Strona główna
            </Link>
          </li>
          <li className={optionStyles.option}>
            <Link to="/appointments" onClick={closeHandler}>
            Wizyty
            </Link>
          </li>
          <li className={optionStyles.option}>
            <Link to="/products" onClick={closeHandler}>
              Produkty
            </Link>
          </li>
          <li className={optionStyles.option}>
            <Link to="/contact" onClick={closeHandler}>
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>
      <footer className={styles.footer}>
        <p>Wszelkie prawa zastrzeżone &copy; 2022</p>
      </footer>
    </div>,
    document.getElementById("mobile-nav-root")
  );
};

const MobileNav = () => {
  const [isMNavClosed, setIsMNavClosed] = useState(true);

  const openHandler = () => {
    document.body.style.overflow = "hidden";
    setIsMNavClosed(false);
  };

  const closeHandler = () => {
    document.body.style.overflow = "initial";
    document.getElementsByClassName(
      `${styles.overlay}`
    )[0].style.animationName = styles.hideOverlay;
    setTimeout(() => {
      setIsMNavClosed(true);
    }, 200);
  };

  return (
    <React.Fragment>
      <li>
        <i className="fa-solid fa-bars" onClick={openHandler}></i>
      </li>
      {!isMNavClosed && <NavOverlay closeHandler={closeHandler} />}
    </React.Fragment>
  );
};

export default MobileNav;
