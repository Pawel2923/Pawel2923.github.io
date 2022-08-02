import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import Product from "./Product";
import SortProducts from "./SortProducts";
import Aside from "./Aside/Aside";
import Button from "components/UI/Button/Button";
import Loading from "components/UI/Loading/Loading";
import classes from "./Products.module.css";
import useHttp from "hooks/use-http";
import Modal from "components/UI/Modal/Modal";

const requestConfig = {
  url: "https://barber-shop-react-default-rtdb.europe-west1.firebasedatabase.app/products.json",
};

let defaultItems = [];

const Products = () => {
  const [items, setItems] = useState(defaultItems);
  const [sortBy, setSortBy] = useState("none");
  const [filterBy, setFilterBy] = useState("none");

  const { isLoading, error, sendRequest } = useHttp();

  const getProducts = (data) => {
    try {
      let transformedData = [];
      for (let key in data) {
        transformedData.push(data[key]);
      }
  
      if (!transformedData) {
        throw new Error("Wystąpił błąd: Nie można znaleźć listy produktów");
      }
  
      setItems(transformedData);
      defaultItems = transformedData;
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    sendRequest(requestConfig, getProducts);
  }, [sendRequest]);

  const sortSelectChangeHandler = (ev) => {
    setSortBy(ev.target.value);
  };

  const sortSubmitHandler = (ev) => {
    ev.preventDefault();

    // sortItems();
  };

  const filterItems = () => {

  };

  const resetItems = () => {
    setItems(defaultItems);

    // if (sortBy !== "none") {
    //   sortItems();
    // }
  };

  return (
    <div className={classes["products-container"]}>
      <Aside
        onFilter={filterItems}
        onReset={resetItems}
      />
      <section className={classes["products-catalog"]}>
        <div className={classes.sort}>
          <form onSubmit={sortSubmitHandler}>
            <select
              id="sortBy"
              onChange={sortSelectChangeHandler}
              // defaultValue={sortBy}
            >
              <option value="none">Trafność - największa</option>
              <option value="titleA">Nazwa (A-Z)</option>
              <option value="titleZ">Nazwa (Z-A)</option>
              <option value="priceMax">Cena - malejąco</option>
              <option value="priceMin">Cena - rosnąco</option>
              <option value="reviews">Najwyżej oceniane</option>
            </select>
            <Button type="submit">Sortuj</Button>
          </form>
          <div className={classes["cart-wrapper"]}>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i> Koszyk
            </Link>
          </div>
        </div>
        <SortProducts items={items} />
        {/* {items.length > 0 &&
          items.map((item) => (
            <Product
              key={item.id}
              info={{
                id: item.id,
                title: item.title,
                image: item.imagePath,
                description: item.description,
                price: item.price,
                score: item.score,
                category: item.category,
              }}
            />
          ))} */}
          {error && <Modal modalInfo={{
            show: true,
            error: true,
            title: "Wystapil Błąd",
            message: error,
          }} />}
          {isLoading && <Loading />}
      </section>
    </div>
  );
};

export default Products;
