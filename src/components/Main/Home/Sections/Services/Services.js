import React from "react";
import styles from "./Services.module.css";
import trim from "./img/trim.jpg";
import haircut from "./img/haircut.jpg";
import procedure from "./img/procedure.jpg";
import barber from "./img/barber.jpg";
import products from "./img/products.jpg";

const Services = (props) => {
  return (
    <section className={props.className}>
      <h1>Nasze usługi</h1>
      <ul className={styles.list}>
        <li className={styles["list-item"]}>
          <img src={trim} alt="Zarost zdjęcie" className={styles.image} />
          <div className={styles["service-description"]}>
            <h3>Strzyżenie i modelowanie brody</h3>
            <br />
            <p>
              Strzyżenie i modelowanie brody w naszym to salonie to najlepszy
              wybór, aby zadbać o swoją brodę.
            </p>
          </div>
        </li>
        <li className={styles["list-item"]}>
          <div className={styles["service-description"]}>
            <h3>Strzyżenie i stylizowanie fryzury</h3>
            <br />
            <p>
              Każdego klienta traktujemy indywidualnie, pomagamy dobrać fryzurę w zależności od typu urody, rodzajów włosów oraz panujących trendów.
            </p>
          </div>
          <img src={haircut} alt="Fryzura zdjęcie" className={styles.image} />
        </li>
        <li className={styles["list-item"]}>
          <img src={procedure} alt="Zabiegi zdjęcie" className={styles.image} />
          <h3>Zabiegi pielęgnacyjne</h3>
        </li>
        <li className={styles["list-item"]}>
          <h3>Doradztwo w zakresie pielęgnacji i stylizacji zarostu</h3>
          <img src={barber} alt="Doradztwo zdjęcie" className={styles.image} />
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
