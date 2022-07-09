import React, { useState } from "react";
import { Link } from "react-router-dom";
import Aside from "./Aside/Aside";
import Button from "components/UI/Button/Button";
import ProductsData from "components/store/ProductsData";
import styles from "./ProductsCatalog.module.css";

const ProductsCatalog = () => {
  const [sortBy, setSortBy] = useState("none");
  const [filter, setFilter] = useState(false);

  const filterHandler = () => {
    setFilter(true);
  };

  const sortSelectChangeHandler = (ev) => {
    if (ev.target.value.trim() !== "") {
      setSortBy(ev.target.value);
    }
  };

  const sortSubmitHandler = (ev) => {
    ev.preventDefault();
    console.log(sortBy);
  };

  return (
    <div className={styles["products-container"]}>
      <Aside onFilter={filterHandler} />
      <section className={styles["products-catalog"]}>
        <div className={styles.sort}>
          <form onSubmit={sortSubmitHandler}>
            <select id="sortBy" onChange={sortSelectChangeHandler} defaultValue="none">
              <option value="none" hidden={true} aria-hidden={true}>Wybierz rodzaj</option>
              <option value="nameA">Nazwa (A-Z)</option>
              <option value="nameZ">Nazwa (Z-A)</option>
              <option value="priceMax">Cena - malejąco</option>
              <option value="priceMin">Cena - rosnąco</option>
              <option value="reviews">Najwyżej oceniane</option>
            </select>
            <Button type="submit">Sortuj</Button>
          </form>
        </div>
        {!filter &&
          ProductsData.map((product) => (
            <Link to={`products/${product.id}`} key={product.id}>
              <div className={styles.card}>
                <div className={styles["image-wrapper"]}>
                  <img
                    src={require(`./img/${product.image}`)}
                    alt="Zdjęcie produktu"
                    className={styles.image}
                  />
                </div>
                <div className={styles["desc-wrapper"]}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
};

export default ProductsCatalog;
