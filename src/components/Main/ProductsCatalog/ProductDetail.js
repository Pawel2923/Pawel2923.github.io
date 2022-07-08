import React from "react";
import { useParams } from "react-router-dom";
import ProductsData from "./ProductsData";

const ProductDetail = () => {
  const params = useParams();

  let data = {};

  for (let item of ProductsData) {
    if (item.id === params.productId) {
      data = { ...item };
      break;
    }
  }

  return (
    <section>
      <h1>Szczegóły produktu</h1>
      <p>{data.details}</p>
    </section>
  );
};

export default ProductDetail;
