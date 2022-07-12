import Button from "components/UI/Button/Button";
import { useState } from "react";
import styles from "./Services.module.css";

const checkValidity = (type, value) => {
  if (type === "text") {
    if (value.trim() !== "") {
      return true;
    } else {
      return false;
    }
  }

  if (type === "email") {
    if (value.trim() !== "") {
      if (value.includes("@")) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (type === "phoneNumber") {
    if (value.trim() !== "") {
      const re = /[0-9]{3} [0-9]{3} [0-9]{3}/g;
      if (re.test(value)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (type !== "text" && type !== "email" && type !== "phoneNumber") {
    console.error(
      "Funkcja checkValidity potrzebuje prawidłowego paremetru type do poprawnego działania."
    );
  }
};

const Services = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const nameChangeHandler = (ev) => {
    setName(ev.target.value);
  };

  const emailChangeHandler = (ev) => {
    setEmail(ev.target.value);
  };

  const phoneChangeHandler = (ev) => {
    setPhoneNumber(ev.target.value);
  };

  const messageChangeHandler = (ev) => {
    setMessage(ev.target.value);
  };

  const submitHandler = (ev) => {
    ev.preventDefault();

    console.log(name, email, phoneNumber, message);

    setName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
  };

  return (
    <section className={styles.services}>
      <h1>Umów się na wizytę</h1>
      <form onSubmit={submitHandler}>
        <label className={styles.name}>
          <p>
            Imię i nazwisko <span className={styles.asterisk}>*</span>
          </p>
          <input
            type="text"
            id="name"
            value={name}
            onChange={nameChangeHandler}
            required
          />
        </label>
        <label>
          <p>
            E-mail <span className={styles.asterisk}>*</span>
          </p>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            required
          />
        </label>
        <label>
          <p>
            Nr telefonu <span className={styles.asterisk}>*</span>
          </p>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
            onChange={phoneChangeHandler}
            required
          />
        </label>
        <label className={styles.message}>
          <p>
            Wiadomość <span className={styles.asterisk}>*</span>
          </p>
          <textarea
            id="message"
            onChange={messageChangeHandler}
            value={message}
          ></textarea>
        </label>
        <input type="date" aria-hidden={true} hidden={true} />
        <Button type="submit">Wyślij</Button>
      </form>
    </section>
  );
};

export default Services;
