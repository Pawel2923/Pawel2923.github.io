import React, { useEffect, useState } from "react";

import SortFunctions from "./SortFunctions";
import Product from "./Product";

const SortProducts = (props) => {
  return (
    <React.Fragment>
      {props.items.map((item) => (
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
      ))}
    </React.Fragment>
  );
};

export default SortProducts;
