import React from "react";
import Input from "components/UI/Input/Input";
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
          <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Cena</p>
          <Input type="number" inputName="Od" onChange={inputChangeHandler} />
          <Input type="number" inputName="Do" onChange={inputChangeHandler} />
          <Button type="submit" className={styles["submit-btn"]}>
            Filtruj
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default Aside;
