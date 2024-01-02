import React from 'react';

const initialCartState = {
  cartItems: [],
  updateCartItems: () => {},
  addCartItems: () => {},
  totalBasketPrice: 0,
  clearCart: () => {},
};

export const CartContext = React.createContext(initialCartState);
