import React from "react";
import { Link, NavLink } from "react-router-dom";
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
        <NavLink to="/home">Strona główna</NavLink>
      </li>
      <li className={optionStyles.option}>
        <NavLink to="/about">O nas</NavLink>
      </li>
      <li className={optionStyles.option}>
        <NavLink to="/services">Usługi</NavLink>
      </li>
      <li className={optionStyles.option}>
        <NavLink to="/products">Produkty</NavLink>
      </li>
      <li className={optionStyles.option}>
        <NavLink to="/contact">Kontakt</NavLink>
      </li>
    </React.Fragment>
  );
};

export default Nav;
