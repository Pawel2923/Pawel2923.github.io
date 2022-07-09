import React from "react";
import { Link } from "react-router-dom";
import Aside from "./Aside/Aside";
import ProductsData from "components/store/ProductsData";
import styles from "./ProductsCatalog.module.css";

const ProductsCatalog = () => {
  return (
    <div className={styles["products-container"]}>
      <Aside />
      <section className={styles["products-catalog"]}>
        {ProductsData.map((product) => (
          <Link to={`products/${product.id}`} key={product.id}>
            <div className={styles.card}>
              <div className={styles["image-wrapper"]}>
                <img
                  src={require(`./img/${product.image}`)}
                  alt="Zdjęcie produktu"
                  className={styles.image}
                />
              </div>
              <div className={styles["desc-wrapper"]}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ProductsCatalog;
