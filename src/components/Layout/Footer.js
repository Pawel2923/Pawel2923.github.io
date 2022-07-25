import { useEffect } from 'react';

import classes from './Footer.module.css';

const Footer = () => {
  useEffect(() => {
    const changeFooterPosition = (bodyHeight) => {
      if (!(window.innerHeight <= bodyHeight)) {
        document
          .getElementsByClassName(classes.footer)[0]
          .classList.add(classes.absolute);
      } else {
        document
          .getElementsByClassName(classes.footer)[0]
          .classList.remove(classes.absolute);
      }
    };

    const resizeObserver = new ResizeObserver((entries) =>
      changeFooterPosition(entries[0].target.clientHeight)
    );

    resizeObserver.observe(document.body);
  }, []);

  return (
    <footer className={classes.footer}>
      <p>Wszelkie prawa zastrzeżone &copy; 2022</p>
    </footer>
  );
};

export default Footer;
