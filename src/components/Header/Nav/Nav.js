import React, { useState, useEffect } from "react";
import MobileNav from "./MobileNav";
import styles from "./Nav.module.css";
import optionStyles from "./Option.module.css";

const Nav = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isMNavClosed, setIsMNavClosed] = useState(true);

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
      if (window.innerWidth <= 700) {
        closeHandler(true);
      }

      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error(`Sekcja o id ${sectionId} nie istnieje`);
    }
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
            scrollToSection("products");
          }}
        >
          Produkty
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
    </React.Fragment>
  );

  if (screenSize <= 700) {
    navContent = (
      <React.Fragment>
        <li>
          <i className="fa-solid fa-bars" onClick={openHandler}></i>
        </li>
        {!isMNavClosed && <MobileNav onClose={closeHandler} scrollToSection={scrollToSection} closeHandler={closeHandler} />}
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
