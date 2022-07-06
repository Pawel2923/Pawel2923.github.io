import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Home/Homepage";
import ProductsCatalog from "./ProductsCatalog/ProductsCatalog";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <main className={styles.main}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Homepage />
        </Route>
        <Route path="/products">
          <ProductsCatalog />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
