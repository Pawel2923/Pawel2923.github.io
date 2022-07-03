import React from "react";
import About from "./Sections/About/About";
import Services from "./Sections/Services/Services";
import Contact from "./Sections/Contact/Contact";
import styles from "./Homepage.module.css";

const Homepage = () => {
  return (
    <React.Fragment>
      <About className={styles.section} />
      <Services className={styles.section} />
      <Contact className={styles.section} />
    </React.Fragment>
  );
};

export default Homepage;
