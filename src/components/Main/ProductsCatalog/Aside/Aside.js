import React, { useState } from "react";
import Button from "components/UI/Button/Button";
import styles from "./Aside.module.css";

const Aside = (props) => {
  const [filter, setFilter] = useState({ type: "", value: "" });

  const filterSubmitHandler = (ev) => {
    ev.preventDefault();
    props.onFilter(filter.type, filter.value);
  };

  const minPriceChangeHandler = (ev) => {
    const value = parseFloat(ev.target.value.trim());
    if (!isNaN(value)) {
      if (value > 0) {
        setFilter({ type: "price", value: value});
      }
    }
  };

  const maxPriceChangeHandler = (ev) => {
    const value = parseFloat(ev.target.value.trim());
    if (!isNaN(value)) {
      if (value > 0) {
      }
    }
  };

  return (
    <aside className={styles.aside}>
      <div className="filter">
        <form onSubmit={filterSubmitHandler}>
          <div className={styles.categories}>
            <h3>Kategoria</h3>
            <label>
              <input type="checkbox" value="test1" />
              <span className="text">Maszynki i trymery</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test2" />
              <span className="text">Grzebienie i szczotki</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test3" />
              <span className="text">Nożyczki</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test4" />
              <span className="text">Nasadki do maszynek</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test4" />
              <span className="text">Kremy i mydła do golenia</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test4" />
              <span className="text">Olejki i żele do golenia</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test4" />
              <span className="text">Olejki do brody</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test4" />
              <span className="text">Balsamy i woski do brody</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test4" />
              <span className="text">Mydła i szampony do brody</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test4" />
              <span className="text">Zestawy do włosów</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test4" />
              <span className="text">Szampony i odżywki do włosów</span>
              <span className="checkmark"></span>
            </label>
            <label>
              <input type="checkbox" value="test4" />
              <span className="text">Pozostałe akcesoria</span>
              <span className="checkmark"></span>
            </label>
          </div>
          <div className={styles.price}>
            <h3>Cena</h3>
            <label>
              <span>Od</span>
              <input
                type="number"
                id="priceMin"
                onChange={minPriceChangeHandler}
              />
            </label>
            <label>
              <span>Do</span>
              <input
                type="number"
                id="priceMax"
                onChange={maxPriceChangeHandler}
              />
            </label>
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
