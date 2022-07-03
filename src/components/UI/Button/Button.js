import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type !== undefined ? props.type : "button"}
      onClick={props.onClick}
      className={`${styles.button} ${
        props.className !== undefined ? props.className : ""
      }`}
      title={props.title !== undefined ? props.title : ""}
    >
      {props.children}
    </button>
  );
};

export default Button;
