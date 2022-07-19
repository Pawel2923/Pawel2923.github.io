import React, { useState } from "react";
import { Link } from "react-router-dom";

import Aside from "./Aside/Aside";
import SortFunctions from "./SortFunctions";
import Button from "components/UI/Button/Button";
import ProductsData from "components/store/ProductsData.json";

import styles from "./ProductsCatalog.module.css";

const ProductsCatalog = () => {
  const [items, setItems] = useState([...ProductsData]);
  const [sortBy, setSortBy] = useState("none");

  const filterItems = (type, minValue, maxValue) => {
    if (type === "price") {
      if (minValue === 0 || minValue === "0") {
        setItems([
          ...ProductsData.filter(
            (value) => value.price <= maxValue
          ),
        ]);
      } else if (maxValue === 0 || maxValue === "0") {
        console.log("ok");
        setItems([
          ...ProductsData.filter(
            (value) => value.price >= minValue
          ),
        ]);
      } else {
        setItems([
          ...ProductsData.filter(
            (value) => value.price >= minValue && value.price <= maxValue
          ),
        ]);
      }
    }
  };

  const sortSelectChangeHandler = (ev) => {
    setSortBy(ev.target.value);
  };

  const sortSubmitHandler = (ev) => {
    ev.preventDefault();

    if (sortBy === "nameA") {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.nameA)];
      });
    }

    if (sortBy === "nameZ") {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.nameZ)];
      });
    }

    if (sortBy === "priceMax") {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.priceMax)];
      });
    }

    if (sortBy === "priceMin") {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.priceMin)];
      });
    }

    if (sortBy === "reviews") {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.reviews)];
      });
    }

    if (sortBy === "none") {
      setItems([...ProductsData]);
    }
  };

  return (
    <div className={styles["products-container"]}>
      <Aside onFilter={filterItems} />
      <section className={styles["products-catalog"]}>
        <div className={styles.sort}>
          <form onSubmit={sortSubmitHandler}>
            <select
              id="sortBy"
              onChange={sortSelectChangeHandler}
              defaultValue={sortBy}
            >
              <option value="none">Trafność - największa</option>
              <option value="nameA">Nazwa (A-Z)</option>
              <option value="nameZ">Nazwa (Z-A)</option>
              <option value="priceMax">Cena - malejąco</option>
              <option value="priceMin">Cena - rosnąco</option>
              <option value="reviews">Najwyżej oceniane</option>
            </select>
            <Button type="submit">Sortuj</Button>
          </form>
          <div className={styles["cart-wrapper"]}>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i> Koszyk
            </Link>
          </div>
        </div>
        {items.map((item) => (
          <Link to={`products/${item.id}`} key={item.id}>
            <div className={styles.card}>
              <div className={styles["image-wrapper"]}>
                <img
                  src={require(`components/store/productsImg/${item.image}`)}
                  alt="Zdjęcie produktu"
                  className={styles.image}
                />
              </div>
              <div className={styles["desc-wrapper"]}>
                <h3>{item.name}</h3>
                <div>{item.description}</div>
                <div>
                  Cena: {item.price.toFixed(2).toString().replace(/\./g, ",")}{" "}
                  zł
                </div>
                <div>
                  Opinie:
                  <div className={styles.rating}>
                    <i
                      className={`fa-solid fa-star ${styles.star} ${
                        item.score >= 20 && styles.checked
                      }`}
                    ></i>
                    <i
                      className={`fa-solid fa-star ${styles.star} ${
                        item.score >= 40 && styles.checked
                      }`}
                    ></i>
                    <i
                      className={`fa-solid fa-star ${styles.star} ${
                        item.score >= 60 && styles.checked
                      }`}
                    ></i>
                    <i
                      className={`fa-solid fa-star ${styles.star} ${
                        item.score >= 80 && styles.checked
                      }`}
                    ></i>
                    <i
                      className={`fa-solid fa-star ${styles.star} ${
                        item.score >= 95 && styles.checked
                      }`}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ProductsCatalog;
