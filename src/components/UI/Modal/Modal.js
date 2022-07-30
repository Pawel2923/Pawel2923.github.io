import { Fragment } from "react";
import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

const portalContainer = document.getElementById("overlays");

const ModalOverlay = (props) => {
  const cardClasses = `${classes.card} ${props.error ? classes.error : ""}`;

  return (
    <Fragment>
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
    </Fragment>
  );
};

const Modal = (props) => {
  const closeHandler = () => {
    props.modalInfo.onClose();
  };

  return createPortal(
    <ModalOverlay
      modalInfo={props.modalInfo}
      error={props.modalInfo.error ? true : false}
      onClose={closeHandler}
    />,
    portalContainer
  );
};

export default Modal;
