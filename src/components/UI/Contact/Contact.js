import React, { useState } from "react";
import Button from "components/UI/Button/Button";
import styles from "./Contact.module.css";

const Contact = (props) => {
  const [showMap, setShowMap] = useState(false);

  const showMapClickHandler = () => {
    if (!showMap) {
      setShowMap(true);
    }
  };

  const hideMapClickHandler = () => {
    if (showMap) {
      setShowMap(false);
    }
  };

  return (
    <section className={props.className}>
      <h1>Skontaktuj się z nami</h1>
      <ul className={styles.list}>
        <li className={styles["list-item"]}>
          <Button onClick={showMapClickHandler} title="Pokaż na mapie">
            <i className={`fa-solid fa-location-dot ${styles.icon}`}></i>
            <span>Jana Długosza 40, 33-300 Nowy Sącz</span>
          </Button>
        </li>
        <li className={styles["list-item"]}>
          <a title="Wyślij email" href="mailto:barber-shop-react@outlook.com">
            <i className={`fa-solid fa-envelope ${styles.icon}`}></i>
            <span>barber-shop-react@outlook.com</span>
          </a>
        </li>
        <li className={styles["list-item"]}>
          <a title="Zadzwoń" href="tel:+48 123 456 789">
            <i className={`fa-solid fa-phone ${styles.icon}`}></i>
            <span>+48 123 456 789</span>
          </a>
        </li>
        <li className={styles["list-item"]}>
          <div>
            <i className={`fa-solid fa-clock ${styles.icon}`}></i>
            <p>Pon-Pią 9:00 - 19:00</p>
            <p>Sob-Niedz: 10:00 - 20:00</p>
          </div>
        </li>
      </ul>
      {(showMap || (props.showMap !== undefined && props.showMap)) && (
        <div className="map">
          <iframe
            title="Mapa"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d646.2445579016344!2d20.6995441687172!3d49.61701505081073!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473de537b62d3f4d%3A0x754e7e58dcfda174!2sJana%20D%C5%82ugosza%2040%2C%2033-300%20Nowy%20S%C4%85cz!5e0!3m2!1spl!2spl!4v1656065124860!5m2!1spl!2spl"
            width="600"
            height="450"
            style={{ border: 0, width: "100%" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {!(props.showMap !== undefined && props.showMap) && <Button onClick={hideMapClickHandler}>Schowaj mapę</Button>}
        </div>
      )}
    </section>
  );
};

export default Contact;
