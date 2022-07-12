import Button from "components/UI/Button/Button";
import { useState } from "react";
import styles from "./Appointments.module.css";

const checkValidity = (type, value) => {
  if (type === "text") {
    if (value.trim() !== "" && value.trim().length >= 3) {
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
      const re1 = /[0-9]{3} [0-9]{3} [0-9]{3}/g;
      const re2 = /[0-9]{3}[0-9]{3}[0-9]{3}/g;
      const re3 = /[0-9]{3}-[0-9]{3}-[0-9]{3}/g;

      if (re1.test(value) || re2.test(value) || re3.test(value)) {
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

    if (!ev.target.validity.valid) {
      ev.target.classList.add("invalid");
    } else {
      ev.target.classList.remove("invalid");
    }
  };

  const emailChangeHandler = (ev) => {
    setEmail(ev.target.value);

    if (!ev.target.validity.valid) {
      ev.target.classList.add("invalid");
    } else {
      ev.target.classList.remove("invalid");
    }
  };

  const phoneChangeHandler = (ev) => {
    setPhoneNumber(ev.target.value);
    
    if (!ev.target.validity.valid) {
      ev.target.classList.add("invalid");
    } else {
      ev.target.classList.remove("invalid");
    }
  };

  const messageChangeHandler = (ev) => {
    setMessage(ev.target.value);
    
    if (!ev.target.validity.valid) {
      ev.target.classList.add("invalid");
    } else {
      ev.target.classList.remove("invalid");
    }
  };

  const validateForm = () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phoneNumber");
    const messageInput = document.getElementById("message");

    if (checkValidity("text", message)) {
      if (messageInput.classList.contains("invalid")) {
        messageInput.classList.remove("invalid");
      }
    } else {
      if (!messageInput.classList.contains("invalid")) {
        messageInput.classList.add("invalid");
        messageInput.focus();
      }
    }

    if (checkValidity("phoneNumber", phoneNumber)) {
      if (phoneInput.classList.contains("invalid")) {
        phoneInput.classList.remove("invalid");
      }
    } else {
      if (!phoneInput.classList.contains("invalid")) {
        phoneInput.classList.add("invalid");
        phoneInput.focus();
      }
    }

    if (checkValidity("email", email)) {
      if (emailInput.classList.contains("invalid")) {
        emailInput.classList.remove("invalid");
      }
    } else {
      if (!emailInput.classList.contains("invalid")) {
        emailInput.classList.add("invalid");
        emailInput.focus();
      }
    }

    if (checkValidity("text", name)) {
      if (nameInput.classList.contains("invalid")) {
        nameInput.classList.remove("invalid");
      }
    } else {
      if (!nameInput.classList.contains("invalid")) {
        nameInput.classList.add("invalid");
        nameInput.focus();
      }
    }
  };

  const submitHandler = (ev) => {
    ev.preventDefault();

    validateForm();

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
            minLength="3"
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
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            pattern="[0-9]{3} [0-9]{3} [0-9]{3}|[0-9]{3}[0-9]{3}[0-9]{3}|[0-9]{3}-[0-9]{3}-[0-9]{3}"
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
            minLength="3"
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
