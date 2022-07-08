import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../img/logo.svg";
import styles from "../Header.module.css";
import optionStyles from "./Option.module.css";

const Nav = () => {
  return (
    <React.Fragment>
      <li>
        <Link
          to="/home"
          className={styles["image-wrapper"]}
          title="Przejdź na stronę główną"
        >
          <Logo />
        </Link>
      </li>
      <li className={optionStyles.option}>
        <Link to="/home">Strona główna</Link>
      </li>
      <li className={optionStyles.option}>
        <Link to="/services">Usługi</Link>
      </li>
      <li className={optionStyles.option}>
        <Link to="/products">Produkty</Link>
      </li>
      <li className={optionStyles.option}>
        <Link to="/contact">Kontakt</Link>
      </li>
    </React.Fragment>
  );
};

export default Nav;
