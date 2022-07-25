import React, { useState } from "react";
import emailjs from "@emailjs/browser";

import Button from "components/UI/Button/Button";
import Message from "components/UI/Message/Message";

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

const Appointments = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const [messageState, setMessageState] = useState({
    show: false,
    error: false,
    title: "",
    message: "",
  });
  const [showLoading, setShowLoading] = useState(false);

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
    let isValid = false;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phoneNumber");
    const messageInput = document.getElementById("message");

    if (checkValidity("text", message)) {
      if (messageInput.classList.contains("invalid")) {
        messageInput.classList.remove("invalid");
      }
      isValid = true;
    } else {
      if (!messageInput.classList.contains("invalid")) {
        messageInput.classList.add("invalid");
        messageInput.focus();
      }
      isValid = false;
    }

    if (checkValidity("phoneNumber", phoneNumber)) {
      if (phoneInput.classList.contains("invalid")) {
        phoneInput.classList.remove("invalid");
      }
      isValid = true;
    } else {
      if (!phoneInput.classList.contains("invalid")) {
        phoneInput.classList.add("invalid");
        phoneInput.focus();
      }
      isValid = false;
    }

    if (checkValidity("email", email)) {
      if (emailInput.classList.contains("invalid")) {
        emailInput.classList.remove("invalid");
      }
      isValid = true;
    } else {
      if (!emailInput.classList.contains("invalid")) {
        emailInput.classList.add("invalid");
        emailInput.focus();
      }
      isValid = false;
    }

    if (checkValidity("text", name)) {
      if (nameInput.classList.contains("invalid")) {
        nameInput.classList.remove("invalid");
      }
      isValid = true;
    } else {
      if (!nameInput.classList.contains("invalid")) {
        nameInput.classList.add("invalid");
        nameInput.focus();
      }
      isValid = false;
    }

    return isValid;
  };

  const submitHandler = (ev) => {
    ev.preventDefault();

    setShowLoading(true);

    setTimeout(() => {
      setShowLoading(false);
    }, 7000);

    if (validateForm()) {
      emailjs
        .send(
          "service_mt81aag",
          "template_j69osgm",
          {
            from_name: name,
            from_email: email,
            reply_to: email,
            message: message,
            phone_number: phoneNumber,
          },
          "vSOVWrVLzBl721pXk"
        )
        .then(
          () => {
            setMessageState({
              show: true,
              error: false,
              title: "Wysłano wiadomość",
              message: "Twoja wiadomość została pomyślnie przesłana.",
            });
          },
          (error) => {
            setMessage({
              show: true,
              error: true,
              title: `Wystąpił błąd ${error.status}`,
              message: (
                <span>
                  Nie udało się wysłać twojej wiadomości.
                  <br />
                  Sprawdź czy wprowadziłeś poprawne dane lub spróbuj ponownie
                  później.
                </span>
              ),
            });
          }
        );
    } else {
      console.warn("Błąd walidacji maila");
    }

    setName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
  };

  const messageCloseHandler = () => {
    document.getElementById("overlay").style.animationName = "fadeOut";
    document.getElementById("card").style.animationName = "hide";

    setTimeout(() => {
      setMessageState((prevState) => {
        let newState = { ...prevState };
        newState.show = false;
        return newState;
      });
    }, 200);
  };

  return (
    <React.Fragment>
      <section className={styles.appointments}>
        <h1>Umów się na wizytę</h1>
        <h3>
          Wyślij wiadomość lub zadzwoń na{" "}
          <a title="Zadzwoń" href="tel:+00 123 000 000">
            +00 123 000 000
          </a>
        </h3>
        <form onSubmit={submitHandler}>
          <label className={styles.name}>
            <p>
              Imię i nazwisko <span className={styles.asterisk}>*</span>
            </p>
            <input
              type="text"
              id="name"
              placeholder="np. Adam Kowalski"
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
              placeholder="np. email@gmail.com"
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
              placeholder="np. 123 456 789"
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
              value={message}
              onChange={messageChangeHandler}
            ></textarea>
          </label>
          <Button type="submit">Wyślij</Button>
        </form>
      </section>
      {showLoading && (
        <i className={`fa-solid fa-spinner ${styles.loading}`}></i>
      )}
      {messageState.show && (
        <Message onClose={messageCloseHandler} messageInfo={messageState} />
      )}
    </React.Fragment>
  );
};

export default Appointments;
