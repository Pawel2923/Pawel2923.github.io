import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import Amount from "components/UI/Amount/Amount";
import Button from "components/UI/Button/Button";
import Modal from "components/UI/Modal/Modal";
import Ratings from "./Ratings";
import classes from "./ProductDetail.module.css";
import CartContext from "store/cart-context";
import useHttp from "hooks/use-http";
import Loading from "components/UI/Loading/Loading";

const requestConfig = {
  url: "https://barber-shop-react-default-rtdb.europe-west1.firebasedatabase.app/products.json",
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
  const [targetItem, setTargetItem] = useState([]);
  const { sendRequest, isLoading, result } = useHttp();

  useEffect(() => {
    sendRequest(requestConfig);
  }, [sendRequest]);

  const [amount, setAmount] = useState(1);
  const [modalState, setModalState] = useState({
    show: false,
    error: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (result) {
      setTargetItem(findProduct(productId, result));
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
        {(targetItem.isFound && !isLoading) ? (
          <React.Fragment>
            <div className={classes["image-wrapper"]}>
              <h1>{targetItem.title}</h1>
              <img
                src={require(`assets/product-img/${targetItem.imagePath}`)}
                className={classes.image}
                alt="Zdjęcie produktu"
              />
            </div>
            <div className={classes.right}>
              <div>
                {parseFloat(targetItem.price)
                  .toFixed(2)
                  .toString()
                  .replace(/\./g, ",")}{" "}
                zł
              </div>
              <Ratings score={parseInt(targetItem.score)} />
              <Amount onAmountChange={amountChangeHandler} />
              <Button onClick={buttonClickHandler}>Dodaj do koszyka</Button>
            </div>
            <div className={classes.bottom}>
              <h1>Opis produktu</h1>
              {targetItem.description}
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
          !isLoading && <h1>Taki produkt nie istnieje</h1>
        )}
      </div>
      {isLoading && <Loading />}
      <br />
    </section>
  );
};

export default ProductDetail;
