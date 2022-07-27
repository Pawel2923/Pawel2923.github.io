import { useState, useContext, useReducer, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from 'components/UI/Button/Button';
import Amount from 'components/UI/Amount/Amount';
import ProductsData from '../Products/ProductsData.json';
import CartContext from 'store/cart-context';
import classes from './Cart.module.css';

const defaultCart = [];

const cartReducer = (state, action) => {
  if (action.type === 'FIND_ITEMS') {
    let cartItems = [];

    if (action.items.length > 0) {
      for (const product of ProductsData) {
        for (const item of action.items) {
          if (item.id === product.id) {
            cartItems.push({ ...product, amount: item.amount });
          }
        }
      }
    } else {
      if (localStorage.getItem('cart') !== null) {
        const cartLocal = JSON.parse(localStorage.getItem('cart'));

        for (const product of ProductsData) {
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
  const [cart, dispatchCart] = useReducer(cartReducer, defaultCart);

  useEffect(() => {
    dispatchCart({ type: 'FIND_ITEMS', items: cartCtx.items });
  }, [cartCtx.items]);

  const backClickHandler = () => {
    history.push('/products');
  };

  const resetClickHandler = () => {
    cartCtx.resetItems();
    dispatchCart({ type: 'RESET' });
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
                    src={require(`assets/product-img/${item.image}`)}
                    className={classes.image}
                    alt="Zdjęcie produktu"
                  />
                </div>
                <div className={classes.right}>
                  <Link to={`/products/${item.id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <Amount
                    onAmountClick={amountClickHandler}
                    value={{ amount: item.amount, key: item.id }}
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
            <Button 
              onClick={resetClickHandler}
            className={classes["reset-btn"]}>Wyczyść koszyk</Button>
            <Button onClick={payClickHandler}>Zapłać</Button>
          </div>
        )}
        {showPayment && (
          <div className={classes.payment}>
            <form onSubmit={paySubmitHandler}>
              <input type="number" placeholder="Numer karty" />
              <input type="text" placeholder="Imię i nazwisko na karcie" />
              <input type="number" placeholder="CVV" />
              <input type="date" placeholder="Data ważności" />
              <Button type="submit">Potwierdź</Button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
