import React, { useState, useEffect } from "react";
import SignUpModal from "./LoginModal/SignUpModal";
import SignInModal from "./LoginModal/SignInModal";
import MobileNav from "./MobileNav";
import styles from "./Nav.module.css";
import optionStyles from "./Option.module.css";

const Nav = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isMNavClosed, setIsMNavClosed] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);

  const openHandler = () => {
    setIsMNavClosed(false);
  };

  const closeHandler = (closeState) => {
    setIsMNavClosed(closeState);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section !== null) {
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

  let navContent = (
    <React.Fragment>
      <li className={optionStyles.option}>
        <button
          className={optionStyles["option-btn"]}
          onClick={() => {
            alert("Naciśnięto Strona główna");
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
      <li>
        <div className={styles["vertical-line"]}></div>
      </li>
      <li>
        <button
          className={`${styles["sign-btn"]} ${styles["signup-btn"]}`}
          onClick={signUpClickHandler}
        >
          Zarejestruj się
        </button>
      </li>
      <li>
        <button
          className={`${styles["sign-btn"]} ${styles["signin-btn"]}`}
          onClick={signInClickHandler}
        >
          Zaloguj się
        </button>
      </li>
      {showSignUp && <SignUpModal onClose={loginModalCloseHandler} />}
      {showSignIn && <SignInModal onClose={loginModalCloseHandler} />}
    </React.Fragment>
  );

  if (screenSize <= 700) {
    navContent = (
      <React.Fragment>
        <li>
          <i className="fa-solid fa-user" onClick={openHandler}></i>
        </li>
        {!isMNavClosed && <MobileNav onClose={closeHandler} />}
      </React.Fragment>
    );
  }

  return (
    <nav className={styles["nav-bar"]}>
      <ul>{navContent}</ul>
    </nav>
  );
};

export default Nav;
