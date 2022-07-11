import React from "react";
import Button from "components/UI/Button/Button";
import styles from "./Aside.module.css";

const Aside = (props) => {
  const filterSubmitHandler = (ev) => {
    ev.preventDefault();
    props.onFilter();
  };

  const inputChangeHandler = (ev) => {
    console.log(ev);
  };

  return (
    <aside className={styles.aside}>
      <div className="filter">
        <form onSubmit={filterSubmitHandler}>
          <div className={styles.categories}>
            <p>Kategoria</p>
            <label>
              <input type="checkbox" value="test1" /> <span className="text">Maszynki, trymery</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test2" /> <span className="text">Grzebienie</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test3" /> <span className="text">Olejki</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test4" /> <span className="text">Szampony i odżywki do
              włosów</span>
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <p>Cena</p>
            <label htmlFor="priceMin">Od</label>
            <input type="number" id="priceMin" onChange={inputChangeHandler} />
            <label htmlFor="priceMax">Do</label>
            <input type="number" id="priceMax" onChange={inputChangeHandler} />
          </div>
          <Button type="submit" className={styles["submit-btn"]}>
            Filtruj
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default Aside;
