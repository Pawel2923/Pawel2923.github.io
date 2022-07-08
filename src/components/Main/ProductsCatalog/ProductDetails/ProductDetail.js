import Button from "components/UI/Button/Button";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ProductsData from "components/store/ProductsData";

import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const params = useParams();

  let data = {};

  for (let item of ProductsData) {
    if (item.id === params.productId) {
      data = { ...item };
      break;
    }
  }

  return (
    <section>
      <nav>
        <Link to="/products">Wróć</Link>
        Koszyk
      </nav>
      <div className="description">
        <h1>{data.name}</h1>
        <div className="left">
          <div className={styles.image} style={{backgroundImage: `url('/product-img/${data.image}')`}}></div>
        </div>
        <div className="right">
          <div>{data.price.toFixed(2).toString().replace(/\./g, ",")} zł</div>
          <Button>Dodaj do koszyka</Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
