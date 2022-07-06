import React, { useContext } from "react";
import PageContext from "components/store/page-context";
import Homepage from "./Home/Homepage";
import ProductsCatalog from "./ProductsCatalog/ProductsCatalog";
import styles from "./Main.module.css";

const Main = () => {
  const { pageName } = useContext(PageContext);

  return (
    <main className={styles.main}>
      {pageName === "home" && <Homepage />}
      {pageName === "products" && <ProductsCatalog />}
      {(pageName !== "home" && pageName !== "products") && <p>Ta strona jest w budowie. Prosimy wrócić później.</p>}
    </main>
  );
};

export default Main;
