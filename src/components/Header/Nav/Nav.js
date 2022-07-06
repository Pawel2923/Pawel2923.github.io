import React, { useContext } from "react";
import PageContext from "components/store/page-context";
import { ReactComponent as Logo } from "../img/logo.svg";
import styles from "../Header.module.css";
import optionStyles from "./Option.module.css";

const Nav = () => {
  const pageCtx = useContext(PageContext);

  const buttonClickHandler = (ev) => {
    pageCtx.changeHandler(ev.target.name);
  };

  return (
    <React.Fragment>
      <li className={optionStyles.logo}>
        <a
          className={styles["image-wrapper"]}
          href="index.html"
          title="Przejdź na stronę główną"
        >
          <Logo className={styles.logo} />
        </a>
      </li>
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
          name="services"
          onClick={buttonClickHandler}
        >
          Usługi
        </button>
      </li>
      <li className={optionStyles.option}>
        <button
          className={optionStyles["option-btn"]}
          name="products"
          onClick={buttonClickHandler}
        >
          Produkty
        </button>
      </li>
      <li className={optionStyles.option}>
        <button
          className={optionStyles["option-btn"]}
          name="contact"
          onClick={buttonClickHandler}
        >
          Kontakt
        </button>
      </li>
    </React.Fragment>
  );
};

export default Nav;
