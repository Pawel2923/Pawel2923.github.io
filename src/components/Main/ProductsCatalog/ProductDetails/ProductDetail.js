import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "components/UI/Button/Button";
import ProductsData from "components/store/ProductsData.json";
import styles from "./ProductDetail.module.css";
import Amount from "components/UI/Amount/Amount";

const ProductDetail = () => {
  const params = useParams();
  const [amount, setAmount] = useState(1);
  let isDataFound = false;
  let data = {};

  for (const item of ProductsData) {
    if (item.id === params.productId) {
      data = { ...item };
      isDataFound = true;
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
        if (old[i].id === data.id) {
          repeatedItem = {
            isRepeated: true,
            id: i,
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
              id: data.id,
              name: data.name,
              description: data.description,
              amount: amount,
              price: data.price,
            },
          ])
        );
      }
    } else {
      localStorage.setItem(
        "inCart",
        JSON.stringify([
          {
            id: data.id,
            name: data.name,
            description: data.description,
            amount: amount,
            price: data.price,
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
        {isDataFound ? (
          <React.Fragment>
            <div className={styles.left}>
              <h1>{data.name}</h1>
              <img
                src={require(`components/store/productsImg/${data.image}`)}
                className={styles.image}
                alt="Zdjęcie produktu"
              />
            </div>
            <div className={styles.right}>
              <div>
                {data.price.toFixed(2).toString().replace(/\./g, ",")} zł
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
