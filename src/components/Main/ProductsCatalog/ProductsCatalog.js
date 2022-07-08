import React from "react";
import { Link } from "react-router-dom";
import ProductsData from "components/store/ProductsData";
import styles from "./ProductsCatalog.module.css";

const ProductsCatalog = () => {
  return (
    <React.Fragment>
      <div className={styles["products-catalog"]}>
        {ProductsData.map((product) => (
          <Link to={`products/${product.id}`} key={product.id}>
            <div className={styles.card}>
              <div className={styles["image-wrapper"]}>
                <div className={styles.image} style={{backgroundImage: `url('/product-img/${product.image}')`}}></div>
              </div>
              <div className={styles["desc-wrapper"]}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductsCatalog;
