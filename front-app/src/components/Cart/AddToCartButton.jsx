"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/contexts/cart/cartContext";

export function AddToCartButton({ item, className = "" }) {
  const { addItem } = useCart();
  const [isRotating, setIsRotating] = useState(false);
  const hasSingle = typeof item?.price?.single === "number";
  const hasPlatter = typeof item?.price?.platter === "number";
  const defaultVariant = hasSingle ? "single" : "platter";
  const [variant, setVariant] = useState(defaultVariant);
  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const getVariantPrice = (choice) => {
    if (choice === "platter" && hasPlatter) return item.price.platter;
    if (choice === "single" && hasSingle) return item.price.single;
    if (hasSingle) return item.price.single;
    if (hasPlatter) return item.price.platter;
    return 0;
  };

  const handleAddToCart = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1500);
    addItem(item, variant);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      {hasSingle && hasPlatter ? (
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm text-gray-600">
            <span className="sr-only">Select size</span>
            <select
              value={variant}
              onChange={(event) => setVariant(event.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="single">Regular</option>
              <option value="platter">Platter</option>
            </select>
          </label>
          <span className="text-sm font-medium text-gray-900">
            {usd.format(getVariantPrice(variant))}
          </span>
        </div>
      ) : (
        <span className="text-sm font-medium text-gray-900">
          {usd.format(getVariantPrice(defaultVariant))}
        </span>
      )}

      <button
        type="button"
        className={`btn-icon inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition justify-center ${className}`}
        onClick={handleAddToCart}
      >
        <PlusIcon
          className={`plus-icon text-white size-5 ${isRotating ? "animate-rotate" : ""}`}
        />
        Add to Cart
      </button>
    </div>
  );
}
