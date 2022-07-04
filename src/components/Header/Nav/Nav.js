import React from "react";
import optionStyles from "./Option.module.css";

const Nav = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section !== null) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error(`Sekcja o id ${sectionId} nie istnieje`);
    }
  };

  return (
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
};

export default Nav;
