"use client";

import { useEffect, useRef, useState } from "react";
import { AddToCartButton } from "./AddToCartButton";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/640x360?text=Photo";

function RelatedItemImage({ item }) {
  const primarySrc =
    item.imageSrc || item.imgUrl || item.imgNetUrl || PLACEHOLDER_IMAGE;
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
      alt={item.imageAlt || item.name}
      src={src}
      onError={handleError}
      className="aspect-square w-full rounded-md object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
    />
  );
}

export function CartRelatedProducts({
  relatedProducts,
  recommendedItems,
  recommendedCategory,
  getItemPrice,
  usd,
}) {
  const recommendations =
    recommendedItems && recommendedItems.length
      ? recommendedItems
      : relatedProducts;

  const carouselItems =
    recommendations && recommendations.length
      ? [...recommendations, ...recommendations, ...recommendations]
      : [];

  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || recommendations.length === 0) return;

    const jumpToMiddle = () => {
      const segment = scroller.scrollWidth / 3;
      scroller.scrollLeft = segment;
    };

    jumpToMiddle();

    const handleScroll = () => {
      const segment = scroller.scrollWidth / 3;
      if (!segment) return;
      if (scroller.scrollLeft <= segment * 0.25) {
        scroller.scrollLeft += segment;
      } else if (scroller.scrollLeft >= segment * 1.75) {
        scroller.scrollLeft -= segment;
      }
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, [recommendations.length]);

  const heading =
    recommendedItems && recommendedItems.length
      ? `Recommended from ${recommendedCategory}`
      : "You may also like…";

  return (
    <section aria-labelledby="related-heading" className="mt-24">
      <h2 id="related-heading" className="text-lg font-medium text-gray-900">
        {heading}
      </h2>

      <div className="mt-6">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pr-2"
        >
          {carouselItems.map((item, index) => (
            <div
              key={item.id || `${item.name}-${index}`}
              className="group relative w-72 shrink-0 snap-start"
            >
            <RelatedItemImage item={item} />
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={item.href || "/menu"} className="hover:text-gray-900">
                    {item.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.color || item.description || ""}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {typeof item.price === "string"
                  ? item.price
                  : usd.format(getItemPrice(item))}
              </p>
            </div>
            <div className="pt-4">
              <AddToCartButton item={item} />
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
