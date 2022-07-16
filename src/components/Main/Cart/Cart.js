import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProductsData from "components/store/ProductsData";
import Button from "components/UI/Button/Button";
import styles from "./Cart.module.css";
import Amount from "components/UI/Amount/Amount";

const Cart = () => {
  const history = useHistory();
  const [inCart, setInCart] = useState([]);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("inCart") !== null) {
      let idList = JSON.parse(localStorage.getItem("inCart"));

      setInCart((prevCart) => {
        return [...idList, ...prevCart];
      });
    }
  }, []);

  useEffect(() => {
    for (let inCartId of inCart) {
      for (let product of ProductsData) {
        if (inCartId === product.id) {
          setProductsList((prevList) => {
            return [product, ...prevList];
          });
        }
      }
    }
  }, [inCart]);

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
            productsList.map((product) => (
              <li key={product.id} className={styles.product}>
                <div className={styles.left}>
                  <img
                    src={require(`components/store/productsImg/${product.image}`)}
                    className={styles.image}
                    alt="Zdjęcie produktu"
                  />
                </div>
                <div className={styles.right}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <Amount />
                </div>
              </li>
            ))
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
