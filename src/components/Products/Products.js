import { useState } from 'react';
import { Link } from 'react-router-dom';

import Aside from './Aside/Aside';
import SortFunctions from './SortFunctions';
import Button from 'components/UI/Button/Button';
import ProductsData from './ProductsData.json';
import Ratings from './Ratings';
import classes from './Products.module.css';

const Products = () => {
  const [items, setItems] = useState(ProductsData);
  const [sortBy, setSortBy] = useState('none');

  const sortItems = () => {
    if (sortBy === 'nameA') {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.nameA)];
      });
    }

    if (sortBy === 'nameZ') {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.nameZ)];
      });
    }

    if (sortBy === 'priceMax') {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.priceMax)];
      });
    }

    if (sortBy === 'priceMin') {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.priceMin)];
      });
    }

    if (sortBy === 'reviews') {
      setItems((prevItems) => {
        return [...prevItems.sort(SortFunctions.reviews)];
      });
    }

    if (sortBy === 'none') {
      setItems([...ProductsData]);
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
    if (type !== 'none') {
      if (type === 'price') {
        filterPrice(ProductsData, filter);
      }

      let newList = [];

      if (type === 'categories') {
        for (let checkbox of filter) {
          newList.push(
            ...ProductsData.filter((value) => value.category === checkbox.value)
          );
        }

        setItems(newList);
      }

      if (type === 'combined') {
        for (let checkbox of filter.checkboxes) {
          newList.push(
            ...ProductsData.filter((value) => value.category === checkbox.value)
          );
        }

        filterPrice(newList, filter);
      }

      if (sortBy !== 'none') {
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
    setItems(ProductsData);

    if (sortBy !== 'none') {
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
              <option value="nameA">Nazwa (A-Z)</option>
              <option value="nameZ">Nazwa (Z-A)</option>
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
        {items.length > 0 ? (
          items.map((item) => (
            <Link to={`products/${item.id}`} key={item.id}>
              <div className={classes.card}>
                <div className={classes["image-wrapper"]}>
                  <img
                    src={require(`assets/product-img/${item.image}`)}
                    alt="Zdjęcie produktu"
                    className={classes.image}
                  />
                </div>
                <div className={classes["desc-wrapper"]}>
                  <h3>{item.name}</h3>
                  <div>{item.description}</div>
                  <div>
                    Cena: {item.price.toFixed(2).toString().replace(/\./g, ",")}{" "}
                    zł
                  </div>
                  <Ratings score={item.score} />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h1>Nie znaleziono wyników</h1>
        )}
      </section>
    </div>
  );
};

export default Products;
