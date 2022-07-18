import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/UI/Button/Button";
import Amount from "components/UI/Amount/Amount";
import ProductsData from "components/store/ProductsData.json";
import styles from "./Cart.module.css";

const Cart = () => {
  const history = useHistory();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartLocal = localStorage.getItem("cart");
    const parsedCart = JSON.parse(cartLocal);

    if (cartLocal !== null && parsedCart.length > 0) {
      for (let product of ProductsData) {
        for (let item of parsedCart) {
          if (item.id === product.id) {
            setCart((prevCart) => {
              return [{ ...product, amount: item.amount }, ...prevCart];
            });
          }
        }
      }
    }
  }, []);

  const backClickHandler = () => {
    history.push("/products");
  };

  const resetClickHandler = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const amountClickHandler = (number, id) => {
    setCart((prevCart) => {
      for (let item of prevCart) {
        if (item.id === id) {
          item.amount = number;
        }
      }
      return [...prevCart];
    });

    const cartLocal = localStorage.getItem("cart");
    const parsedCart = JSON.parse(cartLocal);

    if (cartLocal !== null) {
      let cartUpdated = parsedCart;

      for (let item of cartUpdated) {
        if (item.id === id) {
          item.amount = number;
        }
      }

      localStorage.setItem("cart", JSON.stringify(cartUpdated));
    }
  };

  const removeClickHandler = (id) => {
    if (cart.length > 0) {
      setCart((prevCart) => {
        for (let item of prevCart) {
          if (item.id === id) {
            let index = prevCart.indexOf(item);

            prevCart.splice(index, 1);
          }
        }
        return [...prevCart];
      });
    }

    const cartLocal = localStorage.getItem("cart");
    const parsedCart = JSON.parse(cartLocal);

    if (cartLocal !== null) {
      let cartUpdated = parsedCart;

      for (let item of cartUpdated) {
        if (item.id === id) {
          let index = cartUpdated.indexOf(item);

          cartUpdated.splice(index, 1);
        }
      }

      localStorage.setItem("cart", JSON.stringify(cartUpdated));
    }
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
          {cart.length > 0 ? (
            cart.map((item) => (
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
                  <Amount
                    onAmountClick={amountClickHandler}
                    value={{ amount: item.amount, key: item.id }}
                  />
                  <i
                    className={`fa-solid fa-trash-can ${styles["trash-can"]}`}
                    onClick={() => {
                      removeClickHandler(item.id);
                    }}
                  ></i>
                </div>
              </li>
            ))
          ) : (
            <li>Koszyk jest pusty</li>
          )}
        </ul>
        {cart.length > 0 && (
          <Button onClick={resetClickHandler}>Wyczyść koszyk</Button>
        )}
      </div>
    </section>
  );
};

export default Cart;
