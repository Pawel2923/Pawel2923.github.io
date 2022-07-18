import { useEffect } from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  useEffect(() => {
    const changeFooterPosition = (bodyHeight) => {
      if (!(window.innerHeight <= bodyHeight)) {
        document
          .getElementsByClassName(styles.footer)[0]
          .classList.add(styles.absolute);
      } else {
        document
          .getElementsByClassName(styles.footer)[0]
          .classList.remove(styles.absolute);
      }
    };

    const resizeObserver = new ResizeObserver((entries) =>
      changeFooterPosition(entries[0].target.clientHeight)
    );

    resizeObserver.observe(document.body);
  }, []);

  return (
    <footer className={styles.footer}>
      <p>Wszelkie prawa zastrzeżone &copy; 2022</p>
    </footer>
  );
};

export default Footer;
