import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import ProductsCatalog from "./ProductsCatalog/ProductsCatalog";
import ProductDetail from "./ProductsCatalog/ProductDetails/ProductDetail";
import styles from "./Main.module.css";
import ContactPage from "./ContactPage/ContactPage";

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
        <Route path="/products" exact>
          <ProductsCatalog />
        </Route>
        <Route path="/products/:productId">
          <ProductDetail />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
