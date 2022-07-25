import { Fragment, useState, useContext } from 'react';

import classes from './BackToTop.module.css';
import WindowSizeContext from 'store/window-size';

const BackToTop = () => {
  const windowSizeCtx = useContext(WindowSizeContext);
  const [isShown, setIsShown] = useState(false);

  const toggleShow = () => {
    if (windowSizeCtx.width <= 700) {
      return;
    }

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
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleShow);

  return (
    <Fragment>
      {isShown && (
        <button className={classes.back} onClick={btnClickHandler}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </Fragment>
  );
};

export default BackToTop;
