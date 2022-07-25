import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from '../Header.module.css';
import optionStyles from './Option.module.css';
import { ReactComponent as Logo } from 'assets/logo.svg';

const Nav = () => {
  return (
    <Fragment>
      <li>
        <Link
          to="/home"
          className={styles["image-wrapper"]}
          title="Przejdź na stronę główną"
        >
          <Logo />
        </Link>
      </li>
      <li className={optionStyles.option}>
        <Link to="/home">Strona główna</Link>
      </li>
      <li className={optionStyles.option}>
        <Link to="/appointments">Wizyty</Link>
      </li>
      <li className={optionStyles.option}>
        <Link to="/products">Produkty</Link>
      </li>
      <li className={optionStyles.option}>
        <Link to="/contact">Kontakt</Link>
      </li>
    </Fragment>
  );
};

export default Nav;
