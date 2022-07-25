import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Nav from "./Nav/Nav";
import MobileNav from "./Nav/MobileNav";
import PageInfoCtx from "components/store/page-size";

import styles from "./Header.module.css";
import { ReactComponent as Logo } from "./img/logo.svg";

const Header = () => {
  const pageInfo = useContext(PageInfoCtx)

  return (
    <header className={styles.header}>
      <nav id="navigation-bar">
        <ul>{pageInfo.screenWidth > 700 ? <Nav /> : <MobileNav />}</ul>
        <div>
          <Link to="/home" className={styles["image-wrapper"]}>
            <Logo />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
