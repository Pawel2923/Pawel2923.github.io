import React, { useState } from "react";
import ReactDOM from "react-dom";
import SignUpModal from "./LoginModal/SignUpModal";
import SignInModal from "./LoginModal/SignInModal";
import styles from "./MobileNav.module.css";
import optionStyles from "./Option.module.css";

const MobileNav = (props) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const closeHandler = () => {
    props.onClose(true);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section !== null) {
      closeHandler();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error(`Sekcja o id ${sectionId} nie istnieje`);
    }
  };

  const signUpClickHandler = () => {
    setShowSignUp(true);
  };

  const signInClickHandler = () => {
    setShowSignIn(true);
  };

  const loginModalCloseHandler = () => {
    setShowSignUp(false);
    setShowSignIn(false);
  };

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
                scrollToSection("services");
              }}
            >
              Usługi
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              onClick={() => {
                scrollToSection("about");
              }}
            >
              O nas
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              onClick={() => {
                scrollToSection("pricing");
              }}
            >
              Cennik
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={optionStyles["option-btn"]}
              onClick={() => {
                scrollToSection("contact");
              }}
            >
              Kontakt
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={`${styles["sign-btn"]} ${styles["signup-btn"]} ${optionStyles["option-btn"]}`}
              onClick={signUpClickHandler}
            >
              Zarejestruj się
            </button>
          </li>
          <li className={optionStyles.option}>
            <button
              className={`${styles["sign-btn"]} ${styles["signin-btn"]} ${optionStyles["option-btn"]}`}
              onClick={signInClickHandler}
            >
              Zaloguj się
            </button>
          </li>
          {showSignUp && <SignUpModal onClose={loginModalCloseHandler} />}
          {showSignIn && <SignInModal onClose={loginModalCloseHandler} />}
          <li className={styles.close}>
            <i className="fa-solid fa-xmark" onClick={closeHandler}></i>
          </li>
        </ul>
      </nav>
    </div>,
    document.getElementById("mobile-nav-root")
  );
};

export default MobileNav;
