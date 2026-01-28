"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "./cartReducer";

const CartContext = createContext();

const initialState = {
  items: [],
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (name) => {
    dispatch({ type: "REMOVE_ITEM", payload: { name } });
  };

  const decreaseQty = (name) => {
    dispatch({ type: "DECREASE_QTY", payload: { name } });
  };

  const updateQuantity = (name, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { name, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      const price = item.price?.single || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const value = {
    items: state.items,
    addItem,
    removeItem,
    decreaseQty,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
