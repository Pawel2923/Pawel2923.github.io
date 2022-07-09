import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const validateInput = (ev) => {
    if (ev.target.value.trim() !== "") {
      props.onChange(ev);
    }
  };

  return (
    <React.Fragment>
      <label htmlFor={props.id} className={styles.label}>{props.inputName}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={validateInput}
        className={styles.input}
        required={!props.required && "disabled"}
      />
    </React.Fragment>
  );
};

export default Input;
