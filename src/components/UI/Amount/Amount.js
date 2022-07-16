import { useState, useEffect } from "react";
import styles from "./Amount.module.css";

const Amount = (props) => {
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (props.onAmountChange !== undefined) {
      props.onAmountChange(amount);
    }
  }, [amount, props]);

  useEffect(() => {
    if (props.value !== undefined) {
      setAmount(props.value);
    }
  }, [props]);

  const amountClickHandler = (ev) => {
    if (amount > 1 && ev.target.id === "sub-amount") {
      setAmount(amount - 1);
    }
    if (ev.target.id === "add-amount") {
      setAmount(amount + 1);
    }
  };

  return (
    <div className={styles.amount}>
      <i
        className="fa-solid fa-minus"
        id="sub-amount"
        onClick={amountClickHandler}
      ></i>
      <div className={styles["amount-value"]}>{amount}</div>
      <i
        className="fa-solid fa-plus"
        id="add-amount"
        onClick={amountClickHandler}
      ></i>
    </div>
  );
};

export default Amount;
