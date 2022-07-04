import React from "react";
import styles from "./Services.module.css";
import trim from "./img/trim.jpg";
// import haircut from "./img/haircut.jpg";
// import products from "./img/products.jpg";
// import barber from "./img/barber.jpg";

const Services = (props) => {
  return (
    <section className={`${props.className} ${styles.services}`} id="services">
      <h1>Nasze usługi</h1>
      <ul className={styles.list}>
        <li className={styles["list-item"]}>
          <img src={trim} alt="Strzyżenie zdjęcie" className={styles.image} />
          <h3>Strzyżenie i modelowanie zarostu</h3>
        </li>
      </ul>
    </section>
  );
};

export default Services;
