import { useState, useContext, useReducer, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Button from "components/UI/Button/Button";
import Amount from "components/UI/Amount/Amount";
import Loading from "components/UI/Loading/Loading";
import CartContext from "store/cart-context";
import Modal from "components/UI/Modal/Modal";
import classes from "./Cart.module.css";
import useHttp from "hooks/use-http";

const requestConfig = {
  url: "https://barber-shop-react-default-rtdb.europe-west1.firebasedatabase.app/products.json",
};

const defaultCart = [];

const cartReducer = (state, action) => {
  if (action.type === "FIND_ITEMS") {
    let cartItems = [];

    if (action.items.length > 0) {
      for (const product of action.products) {
        for (const item of action.items) {
          if (item.id === product.id) {
            cartItems.push({ ...product, amount: item.amount });
          }
        }
      }
    } else {
      if (localStorage.getItem("cart") !== null) {
        const cartLocal = JSON.parse(localStorage.getItem("cart"));

        for (const product of action.products) {
          for (const item of cartLocal) {
            if (item.id === product.id) {
              cartItems.push({ ...product, amount: item.amount });
            }
          }
        }
      }
    }

    return cartItems;
  }

  return defaultCart;
};

const Cart = () => {
  const history = useHistory();
  const cartCtx = useContext(CartContext);
  const [showPayment, setShowPayment] = useState(false);
  const [total, setTotal] = useState(0);
  const [cart, dispatchCart] = useReducer(cartReducer, defaultCart);
  const { error, isLoading, sendRequest, result } = useHttp();

  useEffect(() => {
    sendRequest(requestConfig);
  }, [sendRequest]);

  useEffect(() => {
    if (cart.length > 0) {
      let total = 0;
      for (let item of cart) {
        total += item.price * item.amount;
      }
      setTotal(total);
    }
  }, [cart]);

  useEffect(() => {
    if (result) {
      dispatchCart({
        type: "FIND_ITEMS",
        items: cartCtx.items,
        products: result,
      });
    }
  }, [cartCtx.items, result]);

  const backClickHandler = () => {
    history.push("/products");
  };

  const resetClickHandler = () => {
    cartCtx.resetItems();
    dispatchCart({ type: "RESET" });
    setShowPayment(false);
  };

  const amountClickHandler = (id, number) => {
    cartCtx.changeAmount(id, number);
  };

  const removeClickHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const payClickHandler = () => {
    setShowPayment(true);
  };

  const paySubmitHandler = (ev) => {
    ev.preventDefault();

    setShowPayment(false);
  };

  const payCloseHandler = () => {
    setShowPayment(false);
  };

  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth();
  month = +month + 1;

  if (month < 10) {
    month = "0" + month;
  }

  const paymentElement = (
    <div className={classes.payment}>
      <form onSubmit={paySubmitHandler}>
        <label>
          <p>Imię i nazwisko na karcie</p>
          <input type="text" minLength={3} required />
        </label>
        <label>
          <p>Numer karty</p>
          <input type="text" minLength={16} maxLength={16} required />
        </label>
        <label>
          <p>Numer CVV</p>
          <input type="text" minLength={3} maxLength={3} required />
        </label>
        <label>
          <p>Data ważności karty</p>
          <input type="month" min={`${year}-${month}`} required />
        </label>
        <Button type="submit">Potwierdź</Button>
      </form>
    </div>
  );

  return (
    <section className={classes.cart}>
      <nav>
        <button onClick={backClickHandler}>
          <i className="fa-solid fa-circle-arrow-left"></i> Przeglądaj dalej
        </button>
      </nav>
      <div>
        <h1>Koszyk</h1>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className={classes.item}>
                <div className={classes.left}>
                  <img
                    src={require(`assets/product-img/${item.imagePath}`)}
                    className={classes.image}
                    alt="Zdjęcie produktu"
                  />
                </div>
                <div className={classes.right}>
                  <Link to={`/products/${item.id}`}>
                    <h3>{item.title}</h3>
                  </Link>
                  <Amount
                    onAmountClick={amountClickHandler}
                    value={{
                      amount: item.amount,
                      key: item.id,
                    }}
                  />
                  <i
                    className={`fa-solid fa-trash-can ${classes["trash-can"]}`}
                    onClick={() => {
                      removeClickHandler(item.id);
                    }}
                  ></i>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Koszyk jest pusty</p>
        )}
        {cart.length > 0 && (
          <div>
            <p>
              Do zapłaty:{" "}
              <b>{total.toFixed(2).toString().replace(/\./g, ",")} zł</b>
            </p>
            <Button
              onClick={resetClickHandler}
              className={classes["reset-btn"]}
            >
              Wyczyść koszyk
            </Button>
            <Button onClick={payClickHandler}>Zapłać</Button>
          </div>
        )}
        {showPayment && (
          <Modal
            modalInfo={{
              title: "Dokonaj płatność",
              message: paymentElement,
              error: false,
              onClose: payCloseHandler,
            }}
          />
        )}
        {error && (
          <Modal
            modalInfo={{
              show: true,
              error: true,
              title: "Wystapił Błąd",
              message: error,
            }}
          />
        )}
        {isLoading && <Loading />}
      </div>
    </section>
  );
};

export default Cart;
