import React from "react";

import About from "./HomeAbout";
import Products from "./HomeProducts";
import Services from "./HomeServices";
import Contact from "components/UI/Contact/Contact";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <React.Fragment>
      <About className={styles.section} />
      <Products className={styles.section} />
      <Services className={styles.section} />
      <Contact className={styles.section} />
    </React.Fragment>
  );
};

export default Home;
