import React from "react";
import styles from "./ProductsCatalog.module.css";

const ProductsCatalog = () => {
  return (
    <React.Fragment>
      <div className={styles["products-catalog"]}>
        <div className={styles.card}>
          <img src="" alt="Zdjęcie produktu" />
          <h3 className={styles["product-name"]}>Maszynka do przycinania</h3>
          <p className={styles["product-desc"]}>Opis produktu</p>
        </div>
        <div className={styles.card}>
          <img src="" alt="Zdjęcie produktu" />
          <h3 className={styles["product-name"]}>Maszynka do przycinania</h3>
          <p className={styles["product-desc"]}>Opis produktu</p>
        </div>
        <div className={styles.card}>
          <img src="" alt="Zdjęcie produktu" />
          <h3 className={styles["product-name"]}>Maszynka do przycinania</h3>
          <p className={styles["product-desc"]}>Opis produktu</p>
        </div>
        <div className={styles.card}>
          <img src="" alt="Zdjęcie produktu" />
          <h3 className={styles["product-name"]}>Maszynka do przycinania</h3>
          <p className={styles["product-desc"]}>Opis produktu</p>
        </div>
        <div className={styles.card}>
          <img src="" alt="Zdjęcie produktu" />
          <h3 className={styles["product-name"]}>Maszynka do przycinania</h3>
          <p className={styles["product-desc"]}>Opis produktu</p>
        </div>
        <div className={styles.card}>
          <img src="" alt="Zdjęcie produktu" />
          <h3 className={styles["product-name"]}>Maszynka do przycinania</h3>
          <p className={styles["product-desc"]}>Opis produktu</p>
        </div>
        <div className={styles.card}>
          <img src="" alt="Zdjęcie produktu" />
          <h3 className={styles["product-name"]}>Maszynka do przycinania</h3>
          <p className={styles["product-desc"]}>Opis produktu</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductsCatalog;
