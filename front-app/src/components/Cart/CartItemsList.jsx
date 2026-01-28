"use client";

import { useState } from "react";
import { CheckIcon, XMarkIcon as XMarkIconMini } from "@heroicons/react/20/solid";
import { Counter } from "./Counter";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/640x360?text=Photo";

function CartItemImage({ item }) {
  const primarySrc = item.imgUrl || item.imgNetUrl || PLACEHOLDER_IMAGE;
  const [src, setSrc] = useState(primarySrc);

  const handleError = () => {
    if (src !== item.imgNetUrl && item.imgNetUrl) {
      setSrc(item.imgNetUrl);
      return;
    }
    if (src !== PLACEHOLDER_IMAGE) {
      setSrc(PLACEHOLDER_IMAGE);
    }
  };

  return (
    <img
      alt={item.name}
      src={src}
      onError={handleError}
      className="size-24 rounded-md object-contain sm:size-48"
    />
  );
}

export function CartItemsList({
  items,
  onUpdateQuantity,
  onRemoveItem,
  getItemPrice,
  usd,
}) {
  if (items.length === 0) return null;

  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 border-t border-b border-gray-200"
    >
      {items.map((item, itemIdx) => (
        <li key={item.name} className="flex py-6 sm:py-10">
          <div className="shrink-0">
            <CartItemImage item={item} />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <a
                      href="/menu"
                      className="font-medium text-gray-700 hover:text-gray-800"
                    >
                      {item.name}
                    </a>
                  </h3>
                </div>
                {item.description ? (
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                ) : null}
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {usd.format(getItemPrice(item))}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:pr-9">
                <Counter
                  value={item.quantity}
                  min={1}
                  max={99}
                  onChange={(next) => onUpdateQuantity(item.name, next)}
                />

                <div className="absolute top-0 right-0">
                  <button
                    type="button"
                    className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => onRemoveItem(item.name)}
                  >
                    <span className="sr-only">Remove</span>
                    <XMarkIconMini aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-4 flex space-x-2 text-sm text-gray-700">
              <CheckIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-green-500"
              />
              <span>Available</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
