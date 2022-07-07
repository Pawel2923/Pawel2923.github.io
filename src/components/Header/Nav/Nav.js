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
      <li>
        <Link to="/home" className={optionStyles.option}>Strona główna</Link>
      </li>
      <li>
        <Link to="/about" className={optionStyles.option}>O nas</Link>
      </li>
      <li>
        <Link to="/services" className={optionStyles.option}>Usługi</Link>
      </li>
      <li>
        <Link to="/products" className={optionStyles.option}>Produkty</Link>
      </li>
      <li>
        <Link to="/contact" className={optionStyles.option}>Kontakt</Link>
      </li>
    </React.Fragment>
  );
};

export default Nav;
