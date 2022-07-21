import { useState } from "react";

import ProductsData from "components/store/ProductsData.json";
import Button from "components/UI/Button/Button";

import styles from "./AddProducts.module.css";

const image = "product2.jpg";

const AddProducts = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [score, setScore] = useState(50);
  const [result, setResult] = useState("");

  const idChangeHandler = (ev) => {
    setId(ev.target.value);
  };

  const nameChangeHandler = (ev) => {
    setName(ev.target.value);
  };

  const descChangeHandler = (ev) => {
    setDesc(ev.target.value);
  };

  const priceChangeHandler = (ev) => {
    setPrice(ev.target.value);
  };

  const scoreChangeHandler = (ev) => {
    setScore(ev.target.value);
  };

  const copyToClipboard = () => {
    const target = document.getElementById("result");
    target.select();
    target.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(target.value);
    alert("Skopiowano plik JSON");
  };

  const submitHandler = (ev) => {
    ev.preventDefault();

    let data = [
      {
        id: id,
        name: name,
        description: desc,
        image: image,
        price: price,
        score: score,
      },
    ];

    let sessionData = sessionStorage.getItem("productsData");

    if (sessionData !== null) {
      sessionData = JSON.parse(sessionData);

      data = [...sessionData, ...data];

      console.log(data);
      setResult(JSON.stringify(data));

      sessionData = JSON.stringify(data);
      sessionStorage.setItem("productsData", sessionData);
    } else {
      data = [...ProductsData, ...data];

      console.log(data);
      setResult(JSON.stringify(data));

      sessionData = JSON.stringify(data);
      sessionStorage.setItem("productsData", sessionData);
    }

    setId("");
    setName("");
    setDesc("");
    setPrice("");
  };

  const resetList = () => {
    setId("");
    setName("");
    setDesc("");
    setPrice("");
    setScore(50);
    setResult("");
    if (sessionStorage.getItem("productsData") !== null) {
      sessionStorage.removeItem("productsData");
    }
    console.clear();
  };

  return (
    <section className={styles.add}>
      <h1>Dodaj produkt do katalogu produktów</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={id}
          onChange={idChangeHandler}
          placeholder="Id produktu"
          required={true}
        />
        <input
          type="text"
          value={name}
          onChange={nameChangeHandler}
          placeholder="Nazwa produktu"
          required={true}
        />
        <textarea
          value={desc}
          onChange={descChangeHandler}
          placeholder="Opis produktu"
          required={true}
          ></textarea>
        <input
          type="number"
          value={price}
          onChange={priceChangeHandler}
          placeholder="cena"
          required={true}
        />
        <label htmlFor="score">
          <span>Opinia (w punktach od 0 do 100):</span>
        </label>
        <input
          type="range"
          id="score"
          value={score}
          onChange={scoreChangeHandler}
          min="0"
          max="100"
          style={{ padding: 0 }}
        />
        <input
          type="number"
          value={score}
          onChange={scoreChangeHandler}
          min="0"
          max="100"
        />
        <Button type="submit">Dodaj</Button>
      </form>
      <textarea
        type="text"
        id="result"
        onClick={copyToClipboard}
        value={result}
        style={{
          width: "100%",
          minHeight: "10rem",
          marginTop: "2rem",
          padding: "1rem",
          background: "#ffffff",
        }}
        readOnly={true}
      ></textarea>
      <Button onClick={resetList}>Zresetuj listę</Button>
    </section>
  );
};

export default AddProducts;
