"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "./cartReducer";

const CartContext = createContext();

const initialState = {
  items: [],
};

const getDefaultVariant = (item) => {
  if (typeof item.price?.single === "number") return "single";
  if (typeof item.price?.platter === "number") return "platter";
  return "single";
};

const getUnitPrice = (item, variant) => {
  if (typeof item.unitPrice === "number") return item.unitPrice;
  const chosen = item.price?.[variant];
  if (typeof chosen === "number") return chosen;
  if (typeof item.price?.single === "number") return item.price.single;
  if (typeof item.price?.platter === "number") return item.price.platter;
  return 0;
};

const normalizeCartItem = (item) => {
  const variant = item.variant || getDefaultVariant(item);
  const unitPrice = getUnitPrice(item, variant);
  const cartKey = item.cartKey || `${item.name}::${variant}`;
  return { ...item, variant, unitPrice, cartKey };
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        const normalized = {
          ...parsed,
          items: (parsed.items || []).map(normalizeCartItem),
        };
        dispatch({ type: "LOAD_CART", payload: normalized });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addItem = (item, variant) => {
    const chosenVariant = variant || getDefaultVariant(item);
    const payload = normalizeCartItem({ ...item, variant: chosenVariant });
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeItem = (cartKey) => {
    dispatch({ type: "REMOVE_ITEM", payload: { cartKey } });
  };

  const decreaseQty = (cartKey) => {
    dispatch({ type: "DECREASE_QTY", payload: { cartKey } });
  };

  const updateQuantity = (cartKey, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { cartKey, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      const price = typeof item.unitPrice === "number" ? item.unitPrice : 0;
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
