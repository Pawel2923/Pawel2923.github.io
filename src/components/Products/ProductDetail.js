import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import Amount from "components/UI/Amount/Amount";
import Button from "components/UI/Button/Button";
import Modal from "components/UI/Modal/Modal";
import Ratings from "./Ratings";
import classes from "./ProductDetail.module.css";
import CartContext from "store/cart-context";

import useHttp from "hooks/use-http";

const requestConfig = {
  url: "https://barber-shop-react-default-rtdb.europe-west1.firebasedatabase.app/products.json",
};

const applyData = (data) => {
  let transformedData = [];
  for (let key in data) {
    transformedData.push(data[key]);
  }

  return transformedData;
};

const findProduct = (productId, productsData) => {
  for (const product of productsData) {
    if (product.id === productId) {
      return { ...product, isFound: true };
    }
  }
  return { isFound: false };
};

const ProductDetail = () => {
  const { productId } = useParams();
  const history = useHistory();
  const cartCtx = useContext(CartContext);
  const [item, setItem] = useState([]);
  const { sendRequest, result } = useHttp();

  useEffect(() => {
    sendRequest(requestConfig, applyData);
  }, [sendRequest]);

  const [amount, setAmount] = useState(1);
  const [modalState, setModalState] = useState({
    show: false,
    error: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (result !== undefined) {
      setItem(findProduct(productId, result));
    }
  }, [result, productId]);

  const amountChangeHandler = (number) => {
    setAmount(number);
  };

  const messageCloseHandler = () => {
    setModalState((prevState) => {
      let newState = { ...prevState };
      newState.show = false;
      return newState;
    });
  };

  const messageBtnClickHandler = () => {
    history.push("/cart");
  };

  const buttonClickHandler = () => {
    cartCtx.addItem(productId, amount);

    setModalState({
      show: true,
      error: false,
      title: "Dodano do koszyka",
      message: (
        <React.Fragment>
          Produkt został dodany do koszyka.
          <Button
            onClick={messageBtnClickHandler}
            className={classes["message-button"]}
          >
            Przejdź do koszyka
          </Button>
        </React.Fragment>
      ),
    });
  };

  return (
    <section className={classes["products"]}>
      <nav>
        <ul>
          <li>
            <Link to="/products">
              <i className="fa-solid fa-circle-arrow-left"></i> Wróć
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i> Koszyk
            </Link>
          </li>
        </ul>
      </nav>
      <div className={classes.description}>
        {item.isFound ? (
          <React.Fragment>
            <div className={classes["image-wrapper"]}>
              <h1>{item.title}</h1>
              <img
                src={require(`assets/product-img/${item.imagePath}`)}
                className={classes.image}
                alt="Zdjęcie produktu"
              />
            </div>
            <div className={classes.right}>
              <div>
                {parseFloat(item.price)
                  .toFixed(2)
                  .toString()
                  .replace(/\./g, ",")}{" "}
                zł
              </div>
              <Ratings score={parseInt(item.score)} />
              <Amount onAmountChange={amountChangeHandler} />
              <Button onClick={buttonClickHandler}>Dodaj do koszyka</Button>
            </div>
            <div className={classes.bottom}>
              <h1>Opis produktu</h1>
              {item.description}
            </div>
            {modalState.show && (
              <Modal
                modalInfo={{
                  ...modalState,
                  onClose: messageCloseHandler,
                }}
              />
            )}
          </React.Fragment>
        ) : (
          <h1>Taki produkt nie istnieje</h1>
        )}
      </div>
      <br />
    </section>
  );
};

export default ProductDetail;
