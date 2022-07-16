import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "components/UI/Button/Button";
import ProductsData from "components/store/ProductsData.json";
import styles from "./ProductDetail.module.css";
import Amount from "components/UI/Amount/Amount";

const ProductDetail = () => {
  const params = useParams();
  const [amount, setAmount] = useState(1);
  let isItemFound = false;
  let item = {};

  for (const product of ProductsData) {
    if (product.id === params.productId) {
      item = { ...product };
      isItemFound = true;
      break;
    }
  }

  const amountChangeHandler = (number) => {
    setAmount(number);
  };

  const buttonClickHandler = () => {
    let old = JSON.parse(localStorage.getItem("inCart"));

    if (old !== null) {
      let repeatedItem = {
        isRepeated: false,
        id: -1,
        item: {},
      };

      for (let i = 0; i < old.length; i++) {
        if (old[i].id === item.id) {
          repeatedItem = {
            isRepeated: true,
            id: i,
            productId: old[i].id,
            item: { ...old[i] },
          };
        }
      }

      if (repeatedItem.isRepeated) {
        old[repeatedItem.id].amount = repeatedItem.item.amount + amount;
        localStorage.setItem("inCart", JSON.stringify([...old]));
      } else {
        localStorage.setItem(
          "inCart",
          JSON.stringify([
            ...old,
            {
              id: item.id,
              productId: item.productId,
              amount: amount,
            },
          ])
        );
      }
    } else {
      localStorage.setItem(
        "inCart",
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
