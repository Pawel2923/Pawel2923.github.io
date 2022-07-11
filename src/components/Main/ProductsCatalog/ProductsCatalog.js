import React, { useState } from "react";
import { Link } from "react-router-dom";
import Aside from "./Aside/Aside";
import Button from "components/UI/Button/Button";
import SortFunctions from "./SortFunctions";
import styles from "./ProductsCatalog.module.css";
import ProductsData from "components/store/ProductsData";

const ProductsCatalog = () => {
  const [sortBy, setSortBy] = useState("none");
  const [productsList, setProductsList] = useState([...ProductsData]);

  const sortProducts = () => {
    if (sortBy === "nameA") {
      setProductsList((prevState) => {
        return [...prevState.sort(SortFunctions.nameA)];
      });
    }

    if (sortBy === "nameZ") {
      setProductsList((prevState) => {
        return [...prevState.sort(SortFunctions.nameZ)];
      });
    }

    if (sortBy === "priceMax") {
      setProductsList((prevState) => {
        return [...prevState.sort(SortFunctions.priceMax)];
      });
    }

    if (sortBy === "priceMin") {
      setProductsList((prevState) => {
        return [...prevState.sort(SortFunctions.priceMin)];
      });
    }

    if (sortBy === "reviews") {
      setProductsList((prevState) => {
        return [...prevState.sort(SortFunctions.reviews)];
      });
    }
  };

  const sortSelectChangeHandler = (ev) => {
    setSortBy(ev.target.value);
  };

  const sortSubmitHandler = (ev) => {
    ev.preventDefault();

    sortProducts();
  };

  return (
    <div className={styles["products-container"]}>
      <Aside />
      <section className={styles["products-catalog"]}>
        <div className={styles.sort}>
          <form onSubmit={sortSubmitHandler}>
            <select
              id="sortBy"
              onChange={sortSelectChangeHandler}
              defaultValue={sortBy}
            >
              <option value="none" hidden={true} aria-hidden={true}>
                Wybierz rodzaj
              </option>
              <option value="nameA">Nazwa (A-Z)</option>
              <option value="nameZ">Nazwa (Z-A)</option>
              <option value="priceMax">Cena - malejąco</option>
              <option value="priceMin">Cena - rosnąco</option>
              <option value="reviews">Najwyżej oceniane</option>
            </select>
            <Button type="submit">Sortuj</Button>
          </form>
        </div>
        {productsList.map((product) => (
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
                <p>Cena: {product.price.toFixed(2).toString().replace(/\./g, ",")} zł</p>
                <p>Oceny: {product.score}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ProductsCatalog;
