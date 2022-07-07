import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home/Home";
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
          <Home />
        </Route>
        <Route path="/products">
          <ProductsCatalog />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
