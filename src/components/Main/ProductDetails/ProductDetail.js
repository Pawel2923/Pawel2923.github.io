import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import ProductsData from "components/store/ProductsData.json";
import Amount from "components/UI/Amount/Amount";
import Button from "components/UI/Button/Button";

import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const params = useParams();
  const [amount, setAmount] = useState(1);

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

  const buttonClickHandler = () => {
    let cartUpdated = JSON.parse(localStorage.getItem("cart"));

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
        localStorage.setItem("cart", JSON.stringify([...cartUpdated]));
      } else { // Jeśli nie to dodawany jest nowy produkt do listy produktów
        localStorage.setItem(
          "cart",
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
        "cart",
        JSON.stringify([
          {
            id: item.id,
            productId: item.productId,
            amount: amount,
          },
        ])
      );
    }
  };

  return (
    <section className={styles["products"]}>
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
            <div className={styles.left}>
              <h1>{item.name}</h1>
              <img
                src={require(`components/store/productsImg/${item.image}`)}
                className={styles.image}
                alt="Zdjęcie produktu"
              />
            </div>
            <div className={styles.right}>
              <div>
                {item.price.toFixed(2).toString().replace(/\./g, ",")} zł
              </div>
              <Amount onAmountChange={amountChangeHandler} />
              <Button onClick={buttonClickHandler}>Dodaj do koszyka</Button>
            </div>
          </React.Fragment>
        ) : (
          <h1>Taki produkt nie istnieje</h1>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;
