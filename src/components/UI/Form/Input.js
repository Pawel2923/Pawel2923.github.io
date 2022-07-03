import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const validateInput = (ev) => {
    if (ev.target.value.trim()) {
      
    }
  };

  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.inputName}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className={styles.input}
        required={!props.required && "disabled"}
      />
    </React.Fragment>
  );
};

export default Input;
