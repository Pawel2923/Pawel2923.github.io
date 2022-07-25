import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

import Button from 'components/UI/Button/Button';
import Modal from 'components/UI/Modal/Modal';
import classes from './Appointments.module.css';

const checkValidity = (type, value) => {
  if (type === 'TEXT') {
    if (value.trim() !== '' && value.trim().length >= 3) {
      return true;
    } else {
      return false;
    }
  }

  if (type === 'EMAIL') {
    if (value.trim() !== '') {
      if (value.includes('@')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (type === 'PHONE_NUMBER') {
    if (value.trim() !== '') {
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

  console.error('Funkcja checkValidity potrzebuje prawidłowego paremetru type do poprawnego działania.');
  return false;
};

const Appointments = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const [modalState, setModalState] = useState({
    show: false,
    error: false,
    title: '',
    message: '',
  });
  const [showLoading, setShowLoading] = useState(false);

  const nameChangeHandler = (ev) => {
    setName(ev.target.value);

    if (!ev.target.validity.valid) {
      ev.target.classList.add('invalid');
    } else {
      ev.target.classList.remove('invalid');
    }
  };

  const emailChangeHandler = (ev) => {
    setEmail(ev.target.value);

    if (!ev.target.validity.valid) {
      ev.target.classList.add('invalid');
    } else {
      ev.target.classList.remove('invalid');
    }
  };

  const phoneChangeHandler = (ev) => {
    setPhoneNumber(ev.target.value);

    if (!ev.target.validity.valid) {
      ev.target.classList.add('invalid');
    } else {
      ev.target.classList.remove('invalid');
    }
  };

  const messageChangeHandler = (ev) => {
    setMessage(ev.target.value);

    if (!ev.target.validity.valid) {
      ev.target.classList.add('invalid');
    } else {
      ev.target.classList.remove('invalid');
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!checkValidity('TEXT', name)) {
      isValid = false;
    }
    if (!checkValidity('EMAIL', email)) {
      isValid = false;
    }
    if (!checkValidity('PHONE_NUMBER', phoneNumber)) {
      isValid = false;
    }
    if (!checkValidity('TEXT', message)) {
      isValid = false;
    }

    return isValid;
  };

  const submitHandler = (ev) => {
    ev.preventDefault();

    if (validateForm()) {
      setShowLoading(true);

      setTimeout(() => {
        setShowLoading(false);
      }, 7000);

      emailjs
        .send(
          'service_mt81aag',
          'template_j69osgm',
          {
            from_name: name,
            from_email: email,
            reply_to: email,
            message: message,
            phone_number: phoneNumber,
          },
          'vSOVWrVLzBl721pXk'
        )
        .then(
          () => {
            setModalState({
              show: true,
              error: false,
              title: 'Wysłano wiadomość',
              message: 'Twoja wiadomość została pomyślnie przesłana.',
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
      console.warn('Błąd walidacji maila');
    }

    setName('');
    setEmail('');
    setPhoneNumber('');
    setMessage('');
  };

  const messageCloseHandler = () => {
    document.getElementById('overlay').style.animationName = 'fadeOut';
    document.getElementById('card').style.animationName = 'hide';

    setTimeout(() => {
      setModalState((prevState) => {
        let newState = { ...prevState };
        newState.show = false;
        return newState;
      });
    }, 200);
  };

  return (
    <React.Fragment>
      <section className={classes.appointments}>
        <h1>Umów się na wizytę</h1>
        <h3>
          Wyślij wiadomość lub zadzwoń na
          <a title="Zadzwoń" href="tel:+00 123 000 000">
            +00 123 000 000
          </a>
        </h3>
        <form onSubmit={submitHandler}>
          <label className={classes.name}>
            <p>
              Imię i nazwisko <span className={classes.asterisk}>*</span>
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
              E-mail <span className={classes.asterisk}>*</span>
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
              Nr telefonu <span className={classes.asterisk}>*</span>
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
          <label className={classes.message}>
            <p>
              Wiadomość <span className={classes.asterisk}>*</span>
            </p>
            <textarea
              id="message"
              minLength="3"
              value={message}
              onChange={messageChangeHandler}
              required
            />
          </label>
          <Button type="submit">Wyślij</Button>
        </form>
      </section>
      {showLoading && (
        <i className={`fa-solid fa-spinner ${classes.loading}`}></i>
      )}
      {modalState.show && (
        <Modal onClose={messageCloseHandler} modalInfo={modalState} />
      )}
    </React.Fragment>
  );
};

export default Appointments;
