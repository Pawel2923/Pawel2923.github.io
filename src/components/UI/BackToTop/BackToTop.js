import React, { useState } from "react";

import Button from "../Button/Button";

import styles from "./BackToTop.module.css";

const BackToTop = () => {
  const [isShown, setIsShown] = useState(false);

  const toggleShow = () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 400) {
      setIsShown(true);
    } else {
      setIsShown(false);
    }
  };

  const btnClickHandler = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener('scroll', toggleShow);

  return (
    <React.Fragment>
      {window.innerWidth > 700 && (
        <Button className={`${styles.back} ${isShown ? styles.show : ""}`} onClick={btnClickHandler}>
          <i className="fa-solid fa-arrow-up"></i>
        </Button>
      )}
    </React.Fragment>
  );
};

export default BackToTop;
