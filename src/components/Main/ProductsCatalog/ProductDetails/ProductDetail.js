import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "components/UI/Button/Button";
import ProductsData from "components/store/ProductsData";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const params = useParams();
  let isDataFound = false;
  let data = {};

  for (const item of ProductsData) {
    if (item.id === params.productId) {
      data = { ...item };
      isDataFound = true;
      break;
    }
  }

  const buttonClickHandler = () => {
    let old = localStorage.getItem("inCart");
    if (old !== null) {
      old = old.split(",");
      for (let oldItem of old) {
        if (oldItem === params.productId) {
          old = params.productId;
        }
      }

      if (old.indexOf(params.productId) === -1) {
        localStorage.setItem("inCart", `${old},${params.productId}`);
      } else {
        console.error("Ten produkt został już dodany");
      }
    } else {
      localStorage.setItem("inCart", params.productId);
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
