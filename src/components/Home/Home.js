import { Fragment } from "react";

import About from "./HomeAbout";
import Products from "./HomeProducts";
import Services from "./HomeServices";
import Contact from "components/UI/Contact/Contact";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <Fragment>
      <About className={classes.section} />
      <Products className={classes.section} />
      <Services className={classes.section} />
      <Contact className={classes.section} />
    </Fragment>
  );
};

export default Home;
