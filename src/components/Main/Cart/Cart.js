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
        <li key={product.id} className={styles.product}>
          <div className={styles.left}>
            <img
              src={require(`components/store/productsImg/${product.image}`)}
              className={styles.image}
              alt="Zdjęcie produktu"
            />
          </div>
          <div className={styles.right}>
            <p>ID: {product.id}</p>
            <p>Nazwa: {product.name}</p>
          </div>
        </li>
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
        <ul>
          {inCart.length > 0 ? (
            ProductsData.map(mapProducts)
          ) : (
            <li>Koszyk jest pusty</li>
          )}
        </ul>
        {inCart.length > 0 && (
          <Button onClick={resetClickHandler}>Wyczyść koszyk</Button>
        )}
      </div>
    </section>
  );
};

export default Cart;
