import React from "react";
import { Link } from "react-router-dom";

import Option from "./Option";
import classes from "../Header.module.css";
import { ReactComponent as Logo } from "assets/logo.svg";

const Nav = () => {
  return (
    <React.Fragment>
      <li>
        <Link
          to="/"
          className={classes["image-wrapper"]}
          title="Przejdź na stronę główną"
        >
          <Logo />
        </Link>
      </li>
      <Option link={{ to: "/" }}>Strona główna</Option>
      <Option link={{ to: "/appointments" }}>Wizyty</Option>
      <Option link={{ to: "/products" }}>Produkty</Option>
      <Option link={{ to: "/contact" }}>Kontakt</Option>
    </React.Fragment>
  );
};

export default Nav;
