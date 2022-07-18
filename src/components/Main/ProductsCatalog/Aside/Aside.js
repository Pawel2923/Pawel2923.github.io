import React, { useContext, useState } from "react";

import Button from "components/UI/Button/Button";
import PageInfoCtx from "components/store/page-size";

import styles from "./Aside.module.css";

const Aside = (props) => {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [categories, setCategories] = useState([]);

  const pageInfo = useContext(PageInfoCtx);

  const minPriceChangeHandler = (ev) => {
    const value = parseFloat(ev.target.value.trim());
    if (!isNaN(value)) {
      setPriceMin(value);
    }
  };

  const maxPriceChangeHandler = (ev) => {
    const value = parseFloat(ev.target.value.trim());
    if (!isNaN(value)) {
      setPriceMax(value);
    }
  };

  const checkboxChangeHandler = (ev) => {
    setCategories((prevState) => [...prevState, ev.target.value]);

    console.log(categories);
  };

  const formBtnClickHandler = () => {
    const contentBtn = document.getElementsByClassName(
      styles["form-content-btn"]
    )[0];
    const asideForm = document.getElementById("asideFormContent");

    asideForm.classList.toggle("hideElement");
    if (asideForm.classList.contains("hideElement")) {
      contentBtn.innerHTML = "Pokaż filtry";
      contentBtn.style.marginTop = "0";
    } else {
      contentBtn.innerHTML = "Schowaj filtry";
      contentBtn.style.marginTop = "1rem";
    }
  };

  const filterSubmitHandler = (ev) => {
    ev.preventDefault();

    props.onFilter("price", priceMin, priceMax);
  };

  let formContent = (
    <React.Fragment>
      <div className={styles.categories}>
        <h3>Kategoria</h3>
        <label>
          <input
            type="checkbox"
            value="maszynki"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Maszynki i trymery</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="grzebienie"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Grzebienie i szczotki</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="nozyczki"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Nożyczki</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="nasadki"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Nasadki do maszynek</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="kremy"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Kremy i mydła do golenia</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="olejki-golenie"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Olejki i żele do golenia</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="olejki-broda"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Olejki do brody</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="balsamy"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Balsamy i woski do brody</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="szampony-broda"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Mydła i szampony do brody</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="zestawy-wlosy"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Zestawy do włosów</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="szampony-wlosy"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Szampony i odżywki do włosów</span>
          <span className="checkmark"></span>
        </label>
        <label>
          <input
            type="checkbox"
            value="akcesoria"
            onChange={checkboxChangeHandler}
          />
          <span className="text">Pozostałe akcesoria</span>
          <span className="checkmark"></span>
        </label>
      </div>
      <div className={styles.price}>
        <h3>Cena</h3>
        <label>
          <span>Od</span>
          <input type="number" id="priceMin" onChange={minPriceChangeHandler} />
        </label>
        <label>
          <span>Do</span>
          <input type="number" id="priceMax" onChange={maxPriceChangeHandler} />
        </label>
      </div>
    </React.Fragment>
  );

  if (pageInfo.screenWidth < 700) {
    formContent = (
      <React.Fragment>
        <div id="asideFormContent" className="hideElement">
          {formContent}
        </div>
        <Button
          onClick={formBtnClickHandler}
          className={styles["form-content-btn"]}
        >
          Pokaż filtry
        </Button>
      </React.Fragment>
    );
  }

  return (
    <aside className={styles.aside}>
      <div className="filter">
        <form onSubmit={filterSubmitHandler}>
          {formContent}
          <Button type="submit" className={styles["submit-btn"]}>
            Filtruj
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default Aside;
