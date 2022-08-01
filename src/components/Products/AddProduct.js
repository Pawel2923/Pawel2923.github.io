import { Fragment, useState, useRef } from "react";

import Button from "components/UI/Button/Button";
import classes from "./AddProduct.module.css";
import useHttp from "hooks/use-http";

const AddProduct = () => {
  const id = useRef();
  const title = useRef();
  const description = useRef();
  const image = useRef();
  const price = useRef();
  const score = useRef();
  const category = useRef();
  const [formError, setFormError] = useState(null);
  const [response, setResponse] = useState(null);

  const { isLoading, error, sendRequest: addProductRequest } = useHttp();

  const responseHandler = (data) => {
    setResponse("Dodano obiekt");
  };

  const formSubmitHandler = (ev) => {
    ev.preventDefault();

    try {
      const newProduct = {
        id: id.current.value,
        title: title.current.value,
        description: description.current.value,
        imagePath: image.current.value,
        price: price.current.value,
        score: score.current.value,
        category: category.current.value,
      };

      for (let key in newProduct) {
        if (!(newProduct[key].trim().length > 0)) {
          throw new Error("Któreś z pól nie zostało wypełnione!");
        }
      }

      addProductRequest(
        {
          url: "https://barber-shop-react-default-rtdb.europe-west1.firebasedatabase.app/products.json",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: newProduct,
        },
        responseHandler
      );
    } catch (err) {
      setFormError(err.message);
      alert(err.message);
    }
    ev.target.reset();
  };

  let results = <p>Wypełnij formularz aby dodać produkt</p>;

  if (formError) {
    results = <p>{formError}</p>;
  }

  if (error) {
    results = <p>{error}</p>;
  }

  if (response) {
    results = <p>{response}</p>;
  }

  if (isLoading) {
    results = <p>Ładowanie...</p>;
  }

  return (
    <Fragment>
      <form className={classes.card} onSubmit={formSubmitHandler}>
        <label htmlFor="id">Id:</label>
        <input ref={id} type="text" name="id" id="id" required />
        <label htmlFor="name">Name:</label>
        <input ref={title} type="text" name="name" id="name" required />
        <label htmlFor="description">Description:</label>
        <textarea
          ref={description}
          name="description"
          id="description"
          required
        ></textarea>
        <label htmlFor="image">Image:</label>
        <input ref={image} type="text" name="image" id="image" required />
        <label htmlFor="price">Price:</label>
        <input ref={price} type="text" name="price" id="price" required />
        <label htmlFor="score">Score:</label>
        <input ref={score} type="text" name="score" id="score" required />
        <label htmlFor="category">Category:</label>
        <input
          ref={category}
          type="text"
          id="category"
          name="category"
          required
        />
        <Button type="submit">Dodaj</Button>
      </form>
      <div className={classes.card}>{results}</div>
    </Fragment>
  );
};

export default AddProduct;
