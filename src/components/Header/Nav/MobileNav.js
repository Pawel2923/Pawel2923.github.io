import React from "react";
import ReactDOM from "react-dom";
import styles from "./MobileNav.module.css";
import optionStyles from "./Option.module.css";

const MobileNav = (props) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              onClick={() => {
                window.location = "index.html";
              }}
            >
              Strona główna
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              onClick={() => {
                props.scrollToSection("about");
              }}
            >
              O nas
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              onClick={() => {
                props.scrollToSection("services");
              }}
            >
              Usługi
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              onClick={() => {
                props.scrollToSection("products");
              }}
            >
              Produkty
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              onClick={() => {
                props.scrollToSection("contact");
              }}
            >
              Kontakt
            </button>
          </li>
          <li className={styles.close}>
            <i className="fa-solid fa-xmark" onClick={props.closeHandler}></i>
          </li>
        </ul>
      </nav>
    </div>,
    document.getElementById("mobile-nav-root")
  );
};

export default MobileNav;
