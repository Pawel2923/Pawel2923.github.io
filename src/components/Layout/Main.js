import { Route, Switch } from "react-router-dom";

import Home from "components/Home/Home";
import Appointments from "components/Appointments/Appointments";
import Products from "components/Products/Products";
import ProductDetail from "components/Products/ProductDetail";
import Cart from "components/Cart/Cart";
import ContactPage from "components/ContactPage/ContactPage";

import classes from "./Main.module.css";

const Main = () => {
  return (
    <main className={classes.main}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/appointments">
          <Appointments />
        </Route>
        <Route path="/products" exact>
          <Products />
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
          <section>
            <h1>Błąd 404.</h1>
            <p>Strona nie została znaleziona.</p>
          </section>
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
