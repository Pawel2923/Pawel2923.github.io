import React, { useState } from "react";
import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

const portalContainer = document.getElementById("overlays");

const ModalOverlay = (props) => {
  const cardClasses = `${classes.card} ${props.error ? classes.error : ""}`;

  return (
    <React.Fragment>
      <div
        className={classes.overlay}
        id="overlay"
        onClick={props.onClose}
      ></div>
      <div id="card" className={cardClasses}>
        <h1>{props.modalInfo.title}</h1>
        {props.modalInfo.message}
        <div className={classes.close}>
          <i className="fa-solid fa-xmark" onClick={props.onClose}></i>
        </div>
      </div>
    </React.Fragment>
  );
};

const Modal = (props) => {
  const [showModal, setShowModal] = useState(true);

  const closeHandler = () => {
    setShowModal(false);
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
