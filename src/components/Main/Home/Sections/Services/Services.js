import React from "react";
import styles from "./Services.module.css";
import trim from "./img/trim.jpg";
import haircut from "./img/haircut.jpg";
import products from "./img/products.jpg";
import barber from "./img/barber.jpg";

const Services = (props) => {
  return (
    <section className={`${props.className} ${styles.services}`} id="services">
      <h1>Usługi</h1>
      <ul className={styles.list}>
        <li className={styles["list-item"]}>
          <span>Strzyżenie i modelowanie zarostu</span>
          <img src={trim} alt="Zarost" className={styles.image} />
        </li>
        <li className={styles["list-item"]}>
          <span>Strzyżenie i stylizowanie fryzury</span>
          <img src={haircut} alt="Fryzury" className={styles.image} />
        </li>
        <li className={styles["list-item"]}>
          <span>Zabiegi pielęgnacyjne</span>
          <img src={products} alt="Pielęgnacja" className={styles.image} />
        </li>
        <li className={styles["list-item"]}>
          <span>Doradztwo w zakresie pielęgnacji i stylizacji zarostu</span>
          <img src={barber} alt="Doradztwo" className={styles.image} />
        </li>
      </ul>
    </section>
  );
};

export default Services;
