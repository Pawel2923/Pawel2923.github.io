import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import ProductsCatalog from "./ProductsCatalog/ProductsCatalog";
import ProductDetail from "./ProductsCatalog/ProductDetails/ProductDetail";
import ContactPage from "./ContactPage/ContactPage";
import NotFound from "./NotFound/NotFound";
import Appointments from "./Appointments/Appointments";
import Cart from "./Cart/Cart";
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
        <Route path="/appointments">
          <Appointments />
        </Route>
        <Route path="/products" exact>
          <ProductsCatalog />
        </Route>
        <Route path="/products/:productId">
          <ProductDetail />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
