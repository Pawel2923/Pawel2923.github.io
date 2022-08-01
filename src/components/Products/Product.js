import { Link } from "react-router-dom";

import Ratings from "./Ratings";
import classes from "./Product.module.css";

const Product = (props) => {
  return (
    <Link to={`products/${props.info.id}`}>
      <div className={classes.card}>
        <div className={classes["image-wrapper"]}>
          <img
            src={require(`assets/product-img/${props.info.image}`)}
            alt="Zdjęcie produktu"
            className={classes.image}
          />
        </div>
        <div className={classes["desc-wrapper"]}>
          <h3>{props.info.title}</h3>
          <div>{props.info.description}</div>
          <div>
            Cena: {parseFloat(props.info.price).toFixed(2).toString().replace(/\./g, ",")} zł
          </div>
          <Ratings score={parseInt(props.info.score)} />
        </div>
      </div>
    </Link>
  );
};

export default Product;
