import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

const portalContainer = document.getElementById("overlays");

const ModalOverlay = (props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const cardClasses = `${classes.card} ${props.error ? classes.error : ""}`;

  return (
    <div className={classes.overlay} id="overlay" onClick={props.onClose}>
      <div id="card" className={cardClasses}>
        <h1>{props.modalInfo.title}</h1>
        {props.modalInfo.message}
        <div className={classes.close}>
          <i className="fa-solid fa-xmark" onClick={props.onClose}></i>
        </div>
      </div>
    </div>
  );
};

const Modal = (props) => {
  const [showModal, setShowModal] = useState(true);

  const closeHandler = () => {
    setShowModal(false);
    document.body.style.overflow = "initial";
    if (props.onClose) {
      props.onClose();
    }
  };

  if (showModal) {
    return createPortal(
      <ModalOverlay
        modalInfo={props.modalInfo}
        error={props.modalInfo.error ? true : false}
        onClose={closeHandler}
      />,
      portalContainer
    );
  }
};

export default Modal;
