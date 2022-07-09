import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const validateInput = (ev) => {
    if (ev.target.value.trim() !== "") {
      props.onChange(ev);
    }
  };

  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{props.inputName}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={validateInput}
        required={!props.required && "disabled"}
      />
    </div>
  );
};

export default Input;
