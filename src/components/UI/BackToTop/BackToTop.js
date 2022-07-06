import PageInfoCtx from "components/store/page-size";
import React, { useEffect, useContext } from "react";
import Button from "../Button/Button";
import styles from "./BackToTop.module.css";

const BackToTop = () => {
  const pageInfo = useContext(PageInfoCtx);

  useEffect(() => {
    if (pageInfo.screenWidth > 700) {
      if (pageInfo.scrollFromTop > 400) {
        document.getElementsByClassName(styles.back)[0].style.display = "flex";
      }
    }
  }, [pageInfo.screenWidth, pageInfo.scrollFromTop]);

  const btnClickHandler = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <React.Fragment>
      {pageInfo.screenWidth > 700 && (
        <Button className={styles.back} onClick={btnClickHandler}>
          <i className="fa-solid fa-arrow-up"></i>
        </Button>
      )}
    </React.Fragment>
  );
};

export default BackToTop;
