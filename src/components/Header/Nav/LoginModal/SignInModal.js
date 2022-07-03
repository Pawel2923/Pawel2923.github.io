import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import Input from "components/UI/Form/Input";
import Button from "components/UI/Button/Button";
import { ReactComponent as Logo } from "components/Header/img/logo.svg";

const SignUpModal = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const closeOverlay = () => {
    props.onClose();
  };

  const loginChangeHandler = (ev) => {
    setLogin(ev.target.value);
  };

  const passwordChangeHandler = (ev) => {
    setPassword(ev.target.value);
  };

  const submitHandler = (ev) => {
    ev.preventDefault();
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className={styles.overlay}>
          <header className={styles.header}>
            <Logo className={styles.logo} />
            <hr className={styles["horizontal-line"]} />
          </header>
          <form onSubmit={submitHandler}>
            <Input
              id="login"
              type="text"
              value={login}
              onChange={loginChangeHandler}
              inputName="Login"
              isRequired={true}
            />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={passwordChangeHandler}
              inputName="Hasło"
              isRequired={true}
            />
            <Button type="submit">Zaloguj się</Button>
            <Button type="button" onClick={closeOverlay}>
              Wróć
            </Button>
          </form>
        </div>,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default SignUpModal;
