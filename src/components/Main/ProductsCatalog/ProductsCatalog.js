import React, { useState } from "react";
import { Link } from "react-router-dom";
import Aside from "./Aside/Aside";
import Button from "components/UI/Button/Button";
import SortFunctions from "./SortFunctions";
import styles from "./ProductsCatalog.module.css";
import ProductsData from "components/store/ProductsData";

const ProductsCatalog = () => {
  const [productsList, setProductsList] = useState([...ProductsData]);
  const [sortBy, setSortBy] = useState("none");

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

    if (sortBy === "none") {
      setProductsList([...ProductsData]);
    }
  };

  const filterProducts = (type, minValue, maxValue) => {
    if (type === "price") {
      setProductsList([
        ...ProductsData.filter(
          (value) => value.price >= minValue && value.price <= maxValue
        ),
      ]);
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
      <Aside onFilter={filterProducts} />
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
        {productsList.map((product) => (
          <Link to={`products/${product.id}`} key={product.id}>
            <div className={styles.card}>
              <div className={styles["image-wrapper"]}>
                <img
                  src={require(`components/store/productsImg/${product.image}`)}
                  alt="Zdjęcie produktu"
                  className={styles.image}
                />
              </div>
              <div className={styles["desc-wrapper"]}>
                <h3>{product.name}</h3>
                <div>{product.description}</div>
                <div>
                  Cena:{" "}
                  {product.price.toFixed(2).toString().replace(/\./g, ",")} zł
                </div>
                <div>
                  Opinie:
                  <div className={styles.rating}>
                    <i
                      className={`fa-solid fa-star ${styles.star} ${
                        product.score >= 20 && styles.checked
                      }`}
                    ></i>
                    <i
                      className={`fa-solid fa-star ${styles.star} ${
                        product.score >= 40 && styles.checked
                      }`}
                    ></i>
                    <i
                      className={`fa-solid fa-star ${styles.star} ${
                        product.score >= 60 && styles.checked
                      }`}
                    ></i>
                    <i
                      className={`fa-solid fa-star ${styles.star} ${
                        product.score >= 80 && styles.checked
                      }`}
                    ></i>
                    <i
                      className={`fa-solid fa-star ${styles.star} ${
                        product.score >= 95 && styles.checked
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
