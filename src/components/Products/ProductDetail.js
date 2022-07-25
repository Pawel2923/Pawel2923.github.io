import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import Amount from 'components/UI/Amount/Amount';
import Button from 'components/UI/Button/Button';
import Modal from 'components/UI/Modal/Modal';
import ProductsData from './ProductsData.json';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const params = useParams();
  const history = useHistory();
  const [amount, setAmount] = useState(1);
  const [modalState, setModalState] = useState({
    show: false,
    error: false,
    title: '',
    message: '',
  });

  // Wyszukanie produktu z listy wszystkich produków
  let isItemFound = false;
  let item = {};

  for (const product of ProductsData) {
    if (product.id === params.productId) {
      item = { ...product };
      isItemFound = true;
      break;
    }
  }

  // Zmiana Ilości
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
    let cartUpdated = JSON.parse(localStorage.getItem('cart'));

    // Sprawdzenie czy koszyk jest pusty
    if (cartUpdated !== null) {
      let repeatedItem = {
        isRepeated: false,
        id: -1,
        item: {},
      };

      // Pętla przeszukuje listę produktów z koszyka, Jeśli znajdzie to samo id zmienia obiekt repeatedItem
      for (let i = 0; i < cartUpdated.length; i++) {
        if (cartUpdated[i].id === item.id) {
          repeatedItem = {
            isRepeated: true,
            id: i,
            productId: cartUpdated[i].id,
            item: { ...cartUpdated[i] },
          };
        }
      }

      // Jeśli produkt się powtórzył to dodana jest ilość produktów
      if (repeatedItem.isRepeated) {
        cartUpdated[repeatedItem.id].amount = repeatedItem.item.amount + amount;
        localStorage.setItem('cart', JSON.stringify([...cartUpdated]));
      } else {
        // Jeśli nie to dodawany jest nowy produkt do listy produktów
        localStorage.setItem(
          'cart',
          JSON.stringify([
            {
              id: item.id,
              productId: item.productId,
              amount: amount,
            },
            ...cartUpdated,
          ])
        );
      }
    } else {
      localStorage.setItem(
        'cart',
        JSON.stringify([
          {
            id: item.id,
            productId: item.productId,
            amount: amount,
          },
        ])
      );
    }

    setModalState({
      show: true,
      error: false,
      title: 'Dodano do koszyka',
      message: <React.Fragment>
        Produkt został dodany do koszyka. 
        <Button onClick={messageBtnClickHandler} className={styles['message-button']}>Przejdź do koszyka</Button>
      </React.Fragment>,
    });
  };

  return (
    <section className={styles['products']}>
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
      <div className={styles.description}>
        {isItemFound ? (
          <React.Fragment>
            <div className={styles["image-wrapper"]}>
              <h1>{item.name}</h1>
              <img
                src={require(`assets/product-img/${item.image}`)}
                className={styles.image}
                alt="Zdjęcie produktu"
              />
            </div>
            <div className={styles.right}>
              <div>
                {item.price.toFixed(2).toString().replace(/\./g, ",")} zł
              </div>
              <div>
                Oceny tego produktu:
                <div className={styles.rating}>
                  <i
                    className={`fa-solid fa-star ${styles.star} ${
                      item.score >= 20 && styles.checked
                    }`}
                  ></i>
                  <i
                    className={`fa-solid fa-star ${styles.star} ${
                      item.score >= 40 && styles.checked
                    }`}
                  ></i>
                  <i
                    className={`fa-solid fa-star ${styles.star} ${
                      item.score >= 60 && styles.checked
                    }`}
                  ></i>
                  <i
                    className={`fa-solid fa-star ${styles.star} ${
                      item.score >= 80 && styles.checked
                    }`}
                  ></i>
                  <i
                    className={`fa-solid fa-star ${styles.star} ${
                      item.score >= 95 && styles.checked
                    }`}
                  ></i>
                </div>
              </div>
              <Amount onAmountChange={amountChangeHandler} />
              <Button onClick={buttonClickHandler}>Dodaj do koszyka</Button>
            </div>
            <div className={styles.bottom}>
              <h1>Opis produktu</h1>
              {item.description}
            </div>
            {modalState.show && (
              <Modal
                onClose={messageCloseHandler}
                modalInfo={modalState}
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
