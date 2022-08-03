import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Product from "./Product";
import Aside from "./Aside/Aside";
import Button from "components/UI/Button/Button";
import classes from "./Products.module.css";
import Modal from "components/UI/Modal/Modal";
import useHttp from "hooks/use-http";
import sortProducts from "./sortProducts";
import filterProducts from "./filterProducts";

const requestConfig = {
  url: "https://barber-shop-react-default-rtdb.europe-west1.firebasedatabase.app/products.json",
};

let defaultItems = [];

const Products = () => {
  const [items, setItems] = useState(defaultItems);
  const { error, sendRequest, result } = useHttp();
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    sendRequest(requestConfig)
  }, [sendRequest]);

  useEffect(() => {
    if (result) {
      setItems(result);
    }
  }, [result]);

  const sortSelectChangeHandler = (ev) => {
    setSortBy(ev.target.value);
  };

  const sortSubmitHandler = (ev) => {
    ev.preventDefault();

    setItems(sortProducts(items, sortBy));
  };

  const filterItems = (filterBy, filterVal) => {
    let filteredProducts = filterProducts(defaultItems, { filterBy, filterVal });
    filteredProducts = sortProducts(filteredProducts, sortBy);

    setItems(filteredProducts);
  };

  const resetItems = () => {
    setItems(sortProducts(defaultItems, sortBy));
  };

  let products = <h3>Nie znaleziono produktów</h3>;

  if (items.length > 0) {
    products = items.map((item) => (
      <Product
        key={item.id}
        info={{
          id: item.id,
          title: item.title,
          imagePath: item.imagePath,
          description: item.description,
          price: item.price,
          score: item.score,
          category: item.category,
        }}
      />
    ));
  }

  return (
    <div className={classes["products-container"]}>
      <Aside onFilter={filterItems} onReset={resetItems} />
      <section className={classes["products-catalog"]}>
        <div className={classes.sort}>
          <form onSubmit={sortSubmitHandler}>
            <select
              id="sortBy"
              onChange={sortSelectChangeHandler}
              defaultValue={sortBy}
            >
              <option value="none">Trafność - największa</option>
              <option value="titleA">Nazwa (A-Z)</option>
              <option value="titleZ">Nazwa (Z-A)</option>
              <option value="priceMax">Cena - malejąco</option>
              <option value="priceMin">Cena - rosnąco</option>
              <option value="score">Najwyżej oceniane</option>
            </select>
            <Button type="submit">Sortuj</Button>
          </form>
          <div className={classes["cart-wrapper"]}>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i> Koszyk
            </Link>
          </div>
        </div>
        {products}
        {error && (
          <Modal
            modalInfo={{
              show: true,
              error: true,
              title: "Wystapił Błąd",
              message: error,
            }}
          />
        )}
      </section>
    </div>
  );
};

export default Products;
