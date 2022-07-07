import React from "react";
import { Link } from "react-router-dom";
import image from "./img/products.jpg";
import styles from "./ProductsCatalog.module.css";

const ProductsCatalog = () => {
  return (
    <React.Fragment>
      <div className={styles["products-catalog"]}>
        <Link to="/products/test">
          <div className={styles.card}>
            <div className={styles["image-wrapper"]}>
              <img src={image} alt="Zdjęcie produktu" />
            </div>
            <div className={styles["desc-wrapper"]}>
              <h3>Maszynka do przycinania</h3>
              <p>Opis produktu</p>
            </div>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ProductsCatalog;
