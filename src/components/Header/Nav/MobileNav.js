import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import PageContext from "components/store/page-context";
import { ReactComponent as Logo } from "../img/logo.svg";
import styles from "./MobileNav.module.css";
import optionStyles from "./Option.module.css";

export const NavOverlay = (props) => {
  const pageName = useContext(PageContext);

  const buttonClickHandler = (ev) => {
    props.closeHandler();
    pageName.changeHandler(ev.target.name);
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <nav className={styles.nav}>
        <div className={styles.close}>
          <i className="fa-solid fa-xmark" onClick={props.closeHandler}></i>
          <a
            className={styles["image-wrapper"]}
            href="index.html"
            title="Przejdź na stronę główną"
          >
            <Logo className={styles.logo} />
          </a>
        </div>
        <ul className={styles.list}>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              name="home"
              onClick={buttonClickHandler}
              >
              Strona główna
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              name="about"
              onClick={buttonClickHandler}
            >
              O nas
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              name="products"
              onClick={buttonClickHandler}
            >
              Usługi
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              name="asd"
              onClick={buttonClickHandler}
            >
              Produkty
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              name="home"
              onClick={buttonClickHandler}
            >
              Kontakt
            </button>
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
      {!isMNavClosed && (
        <NavOverlay
          closeHandler={closeHandler}
        />
      )}
    </React.Fragment>
  );
};

export default MobileNav;
