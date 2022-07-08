import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./About.module.css";
import Button from "components/UI/Button/Button";

const About = (props) => {
  const history = useHistory();

  const buttonClickHandler = () => {
    history.push("/services");
  };

  return (
    <section className={`${styles.about} ${props.className}`}>
      <div className={styles.top}>
        <h1>O nas</h1>
        <h3>
          Salon barberski Barber Shop to miejsce które powstało z myślą o
          Twoim zaroście. Nasz zespół tworzą zgrani i doświadczeni styliści,
          którzy cały czas podnoszą swoje kwalifikacje zawodowe. Kompleksowo
          zadbają o każdy włos, aby spełnić wszystkie oczekiwania.
        </h3>
      </div>
      <div className={`${styles.bottom}`}>
        <div className={styles.left}>
          <h3>Już teraz skorzystaj z naszej oferty</h3>
        </div>
        <div className={styles.right}>
          <Button type="button" onClick={buttonClickHandler}>
            Umów wizytę
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
