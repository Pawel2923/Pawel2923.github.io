import { Fragment, useState } from 'react';
import { createPortal } from 'react-dom';

import classes from './Message.module.css';

const portalContainer = document.getElementById('overlays');

const MessageOverlay = (props) => {
  const cardClasses = `${classes.card} ${props.error ? classes.error : ''}`;

  return (
    <Fragment>
      <div className={classes.overlay} id="overlay" onClick={props.onClose}></div>
      <div id="card" className={cardClasses}>
        <h1>{props.messageInfo.title}</h1>
        {props.messageInfo.message}
        <div className={classes.close}>
          <i className="fa-solid fa-xmark" onClick={props.onClose}></i>
        </div>
      </div>
    </Fragment>
  );
};

const Message = (props) => {

  const closeHandler = () => {
    props.onClose();
  };

  return createPortal(
    <MessageOverlay 
      messageInfo={props.messageInfo} 
      error={props.messageInfo.error ? true : false}
      onClose={closeHandler}
    />, portalContainer);
};

export default Message;
