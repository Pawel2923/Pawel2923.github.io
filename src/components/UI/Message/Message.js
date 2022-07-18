import React from "react";
import ReactDOM from "react-dom";

import styles from "./Message.module.css";

const Message = (props) => {
  const closeHandler = () => {
    props.onClose();
  };

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className={styles.overlay} onClick={closeHandler}></div>
      <div className={`${styles.card} ${props.error ? styles.error : ""}`}>
        {props.children}
        <div className={styles.close}>
          <i className="fa-solid fa-xmark" onClick={closeHandler}></i>
        </div>
      </div>
    </React.Fragment>,
    document.getElementById("overlay-root")
  );
};

export default Message;
