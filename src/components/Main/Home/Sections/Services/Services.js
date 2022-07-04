import React from "react";
import styles from "./Services.module.css";
import trim from "./img/trim.jpg";
import haircut from "./img/haircut.jpg";
import procedure from "./img/procedure.jpg"
import barber from "./img/barber.jpg";
import products from "./img/products.jpg";

const Services = (props) => {
  return (
    <section className={`${props.className} ${styles.services}`} id="services">
      <h1>Nasze usługi</h1>
      <ul className={styles.list}>
        <li className={styles["list-item"]}>
          <img src={trim} alt="Zarost zdjęcie" className={styles.image} />
          <h3>Strzyżenie i modelowanie zarostu</h3>
        </li>
        <li className={styles["list-item"]}>
          <img src={haircut} alt="Fryzura zdjęcie" className={styles.image} />
          <h3>Strzyżenie i stylizowanie fryzury</h3>
        </li>
        <li className={styles["list-item"]}>
          <img src={procedure} alt="Zabiegi zdjęcie" className={styles.image} />
          <h3>Zabiegi pielęgnacyjne</h3>
        </li>
        <li className={styles["list-item"]}>
          <img src={barber} alt="Doradztwo zdjęcie" className={styles.image} />
          <h3>Doradztwo w zakresie pielęgnacji i stylizacji zarostu</h3>
        </li>
        <li className={styles["list-item"]}>
          <img src={products} alt="Produkty zdjęcie" className={styles.image} />
          <h3>Produkty pielęgnacyjne</h3>
        </li>
      </ul>
    </section>
  );
};

export default Services;
