import { Fragment, useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import Amount from 'components/UI/Amount/Amount';
import Button from 'components/UI/Button/Button';
import Modal from 'components/UI/Modal/Modal';
import ProductsData from './ProductsData.json';
import Ratings from './Ratings';
import classes from './ProductDetail.module.css';
import CartContext from 'store/cart-context';

const findProduct = (productId) => {
  for (const product of ProductsData) {
    if (product.id === productId) {
      return { ...product, isFound: true };
    }
  }
  return { isFound: false };
};

const ProductDetail = () => {
  const params = useParams();
  const history = useHistory();
  const cartCtx = useContext(CartContext);

  const [amount, setAmount] = useState(1);
  const [modalState, setModalState] = useState({
    show: false,
    error: false,
    title: '',
    message: '',
  });

  const item = findProduct(params.productId);

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
    history.push('/cart');
  };

  const buttonClickHandler = () => {
    cartCtx.addItem(params.productId, amount);

    setModalState({
      show: true,
      error: false,
      title: 'Dodano do koszyka',
      message: (
        <Fragment>
          Produkt został dodany do koszyka. 
          <Button onClick={messageBtnClickHandler} className={classes['message-button']}>Przejdź do koszyka</Button>
        </Fragment>
      ),
    });
  };

  return (
    <section className={classes['products']}>
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
          <Fragment>
            <div className={classes["image-wrapper"]}>
              <h1>{item.name}</h1>
              <img
                src={require(`assets/product-img/${item.image}`)}
                className={classes.image}
                alt="Zdjęcie produktu"
              />
            </div>
            <div className={classes.right}>
              <div>
                {item.price.toFixed(2).toString().replace(/\./g, ",")} zł
              </div>
              <Ratings score={item.score} />
              <Amount onAmountChange={amountChangeHandler} />
              <Button onClick={buttonClickHandler}>Dodaj do koszyka</Button>
            </div>
            <div className={classes.bottom}>
              <h1>Opis produktu</h1>
              {item.description}
            </div>
            {modalState.show && (
              <Modal
                modalInfo={{ ...modalState, onClose: messageCloseHandler }}
              />
            )}
          </Fragment>
        ) : (
          <h1>Taki produkt nie istnieje</h1>
        )}
      </div>
      <br />
    </section>
  );
};

export default ProductDetail;
