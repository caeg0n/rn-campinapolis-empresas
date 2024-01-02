import React from 'react';
import { CartContext } from './cart-context';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = React.useState([]);
  const [totalBasketPrice, setTotalBasketPrice] = React.useState(0);

  const addCartItems = React.useCallback(
    (items, total) => {
      setCartItems(items);
      setTotalBasketPrice(total);
    },
    [],
  );
  
  const updateCartItems = React.useCallback(
    (items, total) => {
      setCartItems(items);
      setTotalBasketPrice(totalBasketPrice + total);
    },
    [totalBasketPrice],
  );

  const clearCart = React.useCallback(() => {
    setCartItems([]);
    setTotalBasketPrice(0);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateCartItems,
        addCartItems,
        totalBasketPrice,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
