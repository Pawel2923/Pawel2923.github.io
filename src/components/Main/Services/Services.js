import Button from "components/UI/Button/Button";
import { useState } from "react";
import styles from "./Services.module.css";

const Services = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const changePhoneHandler = (ev) => {
    setPhoneNumber(ev.target.value);
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
  };

  return (
    <section className={styles.services}>
      <h1>Umów się na wizytę</h1>
      <form onSubmit={submitHandler}>
        <label>
          <p>Imię</p>
          <input type="text" required />
        </label>
        <label>
          <p>Nazwisko</p>
          <input type="text" required />
        </label>
        <label>
          <p>Nr telefonu</p>
          <input
            type="text"
            value={phoneNumber}
            pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
            onChange={changePhoneHandler}
            required
          />
        </label>
        <label>
          <p>E-mail</p>
          <input type="email" required />
        </label>
        <input type="date" aria-hidden={true} hidden={true} />
        <Button type="submit">Umów</Button>
      </form>
    </section>
  );
};

export default Services;
