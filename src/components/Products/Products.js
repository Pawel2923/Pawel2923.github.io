import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Product from "./Product";
import Aside from "./Aside/Aside";
import SortFunctions from "./SortFunctions";
import Button from "components/UI/Button/Button";
import classes from "./Products.module.css";
import useHttp from "hooks/use-http";

const requestConfig = {
  url: "https://barber-shop-react-default-rtdb.europe-west1.firebasedatabase.app/products.json",
};

const applyData = (data) => {
  try {
    let transformedData = [];
    for (let key in data) {
      transformedData.push(data[key]);
    }

    if (!transformedData) {
      throw new Error("Wystąpił błąd: Nie można znaleźć transformaedData");
    }

    return transformedData;
  } catch (err) {
    console.log(err.message);
  }
};

const Products = () => {
  const { sendRequest, result } = useHttp();

  useEffect(() => {
    sendRequest(requestConfig, applyData);
  }, [sendRequest]);

  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    if (result !== undefined) {
      setItems(result);
    }
  }, [result]);

  const sortItems = () => {
    if (sortBy === "titleA") {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.titleA)];
      });
    }

    if (sortBy === "titleZ") {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.titleZ)];
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
      setItems([...result]);
    }
  };

  const filterPrice = (data, filter) => {
    if (filter.minValue === 0) {
      setItems([...data.filter((value) => value.price <= filter.maxValue)]);
    } else if (filter.maxValue === 0) {
      setItems([...data.filter((value) => value.price >= filter.minValue)]);
    } else {
      setItems([
        ...data.filter(
          (value) =>
            value.price >= filter.minValue && value.price <= filter.maxValue
        ),
      ]);
    }
  };

  const filterItems = (type, filter) => {
    if (type !== "none") {
      if (type === "price") {
        filterPrice(result, filter);
      }

      let newList = [];

      if (type === "categories") {
        for (let checkbox of filter) {
          newList.push(
            ...result.filter((value) => value.category === checkbox.value)
          );
        }

        setItems(newList);
      }

      if (type === "combined") {
        for (let checkbox of filter.checkboxes) {
          newList.push(
            ...result.filter((value) => value.category === checkbox.value)
          );
        }

        filterPrice(newList, filter);
      }

      if (sortBy !== "none") {
        sortItems();
      }
    }
  };

  const sortSelectChangeHandler = (ev) => {
    setSortBy(ev.target.value);
  };

  const sortSubmitHandler = (ev) => {
    ev.preventDefault();

    sortItems();
  };

  const resetItems = () => {
    setItems(result);

    if (sortBy !== "none") {
      sortItems();
    }
  };

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
        {items.length > 0 &&
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
          ))}
      </section>
    </div>
  );
};

export default Products;
