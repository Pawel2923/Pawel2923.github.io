import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
   items: []
};

const cartReducer = (state, action) => {
   if (action.type === 'ADD') {
      const existingIndex = state.items.findIndex(item => item.id === action.item.id)
      let updatedItems;

      if (existingIndex !== -1) {
         const existingItem = state.items[existingIndex];

         const updatedItem = {
            ...existingItem,
            amount: existingItem.amount + action.item.amount
         };

         updatedItems = [...state.items];
         updatedItems[existingIndex] = updatedItem;
      } else {
         updatedItems = state.items.concat({ ...action.item });
      }

      return {
         items: updatedItems
      };
   }

   if (action.type === 'REMOVE') {
      let updatedItems = state.items.filter(item => item.id !== action.item.id);

      return {
         items: updatedItems
      }
   }

   if (action.type === 'CHANGE_AMOUNT') {
      const targetId = state.items.findIndex(item => item.id === action.item.id);

      if (targetId !== -1) {
         const target = state.items[targetId];

         const updatedItem = {
            ...target,
            amount: action.item.amount
         };

         let updatedItems = [...state.items];
         updatedItems[targetId] = updatedItem;

         return {
            items: updatedItems
         };
      }

      return state;
   }

   return defaultCartState;
};

const CartProvider = (props) => {
   const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCartState);

   const addItemHandler = (id, amount) => {
      dispatchCartState({ type: 'ADD', item: { id: id, amount: amount } });
   };

   const removeItemHandler = (id) => {
      dispatchCartState({ type: 'REMOVE', item: { id: id } });
   };

   const changeAmountHandler = (id, amount) => {
      dispatchCartState({ type: 'CHANGE_AMOUNT', item: { id: id, amount: amount } });
   };

   const resetItemsHandler = () => {
      dispatchCartState({ type: 'RESET' });
   };

   return (
      <CartContext.Provider
         value={{
            ...cartState,
            addItem: addItemHandler,
            removeItem: removeItemHandler,
            changeAmount: changeAmountHandler,
            resetItems: resetItemsHandler
         }}
      >
         {props.children}
      </CartContext.Provider>
   );
};

export default CartProvider;