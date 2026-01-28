"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/contexts/cart/cartContext";

export function AddToCartButton({ item, className = "" }) {
  const { addItem } = useCart();
  const [isRotating, setIsRotating] = useState(false);

  const handleAddToCart = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1500);
    addItem(item);
  };

  return (
    <button
      type="button"
      className={`btn-icon inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition ${className}`}
      onClick={handleAddToCart}
    >
      <PlusIcon
        className={`plus-icon text-white size-5 ${isRotating ? "animate-rotate" : ""}`}
      />
      Add to Cart
    </button>
  );
}
