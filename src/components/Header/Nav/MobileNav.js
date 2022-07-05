import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./MobileNav.module.css";
import optionStyles from "./Option.module.css";

export const NavOverlay = (props) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <nav className={styles.nav}>
        <div className={styles.close}>
          <i className="fa-solid fa-xmark" onClick={props.closeHandler}></i>
        </div>
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

  const closeHandler = (closeState) => {
    document.body.style.overflow = "initial";
    document.getElementsByClassName(
      `${styles.overlay}`
    )[0].style.animationName = styles.hideOverlay;
    setTimeout(() => {
      setIsMNavClosed(closeState);
    }, 200);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section !== null) {
      closeHandler(true);
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error(`Sekcja o id ${sectionId} nie istnieje`);
    }
  };

  return (
    <React.Fragment>
      <li>
        <i className="fa-solid fa-bars" onClick={openHandler}></i>
      </li>
      {!isMNavClosed && (
        <NavOverlay
          scrollToSection={scrollToSection}
          closeHandler={closeHandler}
        />
      )}
    </React.Fragment>
  );
};

export default MobileNav;
