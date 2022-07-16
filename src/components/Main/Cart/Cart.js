import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/UI/Button/Button";
import Amount from "components/UI/Amount/Amount";
import ProductsData from "components/store/ProductsData.json";
import styles from "./Cart.module.css";

const Cart = () => {
  const history = useHistory();
  const [inCart, setInCart] = useState(localStorage.getItem("inCart"));
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (inCart !== null && inCart.length > 0) {
      let parsedInCart = JSON.parse(inCart);

      for (let product of ProductsData) {
        for (let item of parsedInCart) {
          if (product.id === item.id) {
            setItems((prevItems) => {
              return [{ ...product, amount: item.amount }, ...prevItems];
            });
          }
        }
      }
    }
  }, [inCart]);

  const backClickHandler = () => {
    history.push("/products");
  };

  const resetClickHandler = () => {
    localStorage.removeItem("inCart");
    setInCart([]);
    setItems([]);
  };

  return (
    <section className={styles.cart}>
      <nav>
        <button onClick={backClickHandler}>
          <i className="fa-solid fa-circle-arrow-left"></i> Przeglądaj dalej
        </button>
      </nav>
      <div>
        <h1>Koszyk</h1>
        <ul>
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.left}>
                  <img
                    src={require(`components/store/productsImg/${item.image}`)}
                    className={styles.image}
                    alt="Zdjęcie produktu"
                  />
                </div>
                <div className={styles.right}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <Amount value={item.amount} />
                </div>
              </li>
            ))
          ) : (
            <li>Koszyk jest pusty</li>
          )}
        </ul>
        {items.length > 0 && (
          <Button onClick={resetClickHandler}>Wyczyść koszyk</Button>
        )}
      </div>
    </section>
  );
};

export default Cart;
