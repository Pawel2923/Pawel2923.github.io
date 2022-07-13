import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProductsData from "components/store/ProductsData";
import Button from "components/UI/Button/Button";
import styles from "./Cart.module.css";

const Cart = () => {
  const history = useHistory();
  const [inCart, setInCart] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("inCart") !== null) {
      let idList = localStorage.getItem("inCart").split(",");
      
      setInCart((prevCart) => {
        return [...idList, ...prevCart];
      });
    }
  }, []);

  const mapProducts = (product) => {
    let id = null;

    for (let inCartId of inCart) {
      if (product.id === inCartId) {
        id = product.id;
      }
    }

    let returnValue = "";

    if (product.id === id) {
      returnValue = (
        <div key={product.id}>
          <p>ID: {product.id}</p>
          <p>Nazwa: {product.name}</p>
        </div>
      );
    }

    return returnValue;
  };

  const backClickHandler = () => {
    history.goBack();
  };

  const resetClickHandler = () => {
    localStorage.removeItem("inCart");
    setInCart([]);
  };

  return (
    <section className={styles.cart}>
      <nav>
        <button onClick={backClickHandler}>
          <i className="fa-solid fa-circle-arrow-left"></i> Wróć
        </button>
      </nav>
      <div>
        <h1>Koszyk</h1>
        <div>{ProductsData.map(mapProducts)}</div>
        <Button onClick={resetClickHandler}>Wyczyść koszyk</Button>
      </div>
    </section>
  );
};

export default Cart;
