import { createContext } from "react";

const CartContext = createContext({
   items: [],
   addItem: (id, amount) => {},
   removeItem: (id) => {},
   changeAmount: (id, amount) => {},
   resetItems: () => {}
});

export default CartContext;