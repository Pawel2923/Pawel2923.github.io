import { Fragment, useState, useContext } from 'react';

import Button from 'components/UI/Button/Button';
import { categories } from './categories';
import classes from './Aside.module.css';
import WindowSizeContext from 'store/window-size';

const Aside = (props) => {
  const windowSizeCtx = useContext(WindowSizeContext);

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [isChecked, setIsChecked] = useState(
    new Array(categories.length).fill(false)
  );

  const minPriceChangeHandler = (ev) => {
    const value = parseFloat(ev.target.value.trim());
    if (!isNaN(value)) {
      setPriceMin(value);
    } else {
      setPriceMin(0);
    }
  };

  const maxPriceChangeHandler = (ev) => {
    const value = parseFloat(ev.target.value.trim());
    if (!isNaN(value)) {
      setPriceMax(value);
    } else {
      setPriceMax(0);
    }
  };

  const checkboxChangeHandler = (pos) => {
    const updatedIsChecked = isChecked.map((item, index) =>
      index === pos ? !item : item
    );

    setIsChecked(updatedIsChecked);
  };

  const formBtnClickHandler = () => {
    const contentBtn = document.getElementsByClassName(
      classes['form-content-btn']
    )[0];
    const asideForm = document.getElementById('asideFormContent');

    asideForm.classList.toggle('hideElement');
    if (asideForm.classList.contains('hideElement')) {
      contentBtn.innerHTML = 'Pokaż filtry';
      contentBtn.style.marginTop = '0';
    } else {
      contentBtn.innerHTML = 'Schowaj filtry';
      contentBtn.style.marginTop = '1rem';
    }
  };

  const filterSubmitHandler = (ev) => {
    ev.preventDefault();

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = [];

    for (let checkbox of checkboxes) {
      if (checkbox.checked) {
        checked.push(checkbox);
      }
    }

    if (checked.length > 0 && (priceMin > 0 || priceMax > 0)) {
      props.onFilter('combined', {
        minValue: priceMin,
        maxValue: priceMax,
        checkboxes: checked,
      });
    } else if (checked.length > 0 && priceMin === 0 && priceMax === 0) {
      props.onFilter('categories', checked);
    } else if (priceMin > 0 || priceMax > 0) {
      props.onFilter('price', { minValue: priceMin, maxValue: priceMax });
    } else {
      props.onFilter('none');
    }
  };

  const filterResetHandler = () => {
    setPriceMin(0);
    setPriceMax(0);
    setIsChecked(new Array(categories.length).fill(false));
    props.onReset();
  };

  let formContent = (
    <Fragment>
      <div className={classes.categories}>
        <h3>Kategoria</h3>
        {categories.map((category, index) => (
          <label key={`category-${index}`}>
            <input
              type="checkbox"
              id={`category-${index}`}
              name={category.name}
              value={category.value}
              checked={isChecked[index]}
              onChange={() => {
                checkboxChangeHandler(index);
              }}
            />
            <span className="text">{category.name}</span>
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
      <div className={classes.price}>
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

      <Button type="reset" className={classes['reset-btn']}>
        Resetuj filtry
      </Button>
    </Fragment>
  );

  if (windowSizeCtx.width < 700) {
    formContent = (
      <Fragment>
        <div id="asideFormContent" className="hideElement">
          {formContent}
        </div>
        <Button
          onClick={formBtnClickHandler}
          className={classes['form-content-btn']}
        >
          Pokaż filtry
        </Button>
      </Fragment>
    );
  }

  return (
    <aside className={classes.aside}>
      <div className="filter">
        <form onSubmit={filterSubmitHandler} onReset={filterResetHandler}>
          {formContent}
          <Button type="submit" className={classes["submit-btn"]}>
            Filtruj
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default Aside;
