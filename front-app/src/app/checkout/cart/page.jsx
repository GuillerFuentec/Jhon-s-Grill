"use client";

import { useEffect, useState } from "react";
import { AppNavbar } from "@/components/common/appNavbar";
import { Footer } from "@/components/common/footer";
import { useCart } from "@/contexts/cart/cartContext";
import { CartEmptyState } from "@/components/Cart/CartEmptyState";
import { CartItemsList } from "@/components/Cart/CartItemsList";
import { CartSummary } from "@/components/Cart/CartSummary";
import { CartRelatedProducts } from "@/components/Cart/CartRelatedProducts";
import { getCachedMenu } from "@/config/menu";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const relatedProducts = [];

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [recommendedCategory, setRecommendedCategory] = useState("");

  const getItemPrice = (item) => {
    if (typeof item.price?.single === "number") return item.price.single;
    if (typeof item.price?.platter === "number") return item.price.platter;
    return 0;
  };

  useEffect(() => {
    let isActive = true;

    async function loadRecommendations() {
      if (!items.length) {
        if (isActive) {
          setRecommendedItems([]);
          setRecommendedCategory("");
        }
        return;
      }

      try {
        const menuData = await getCachedMenu("/api/manifest.json");
        const categories = Object.keys(menuData).filter(
          (key) => key.toLowerCase() !== "currency",
        );
        const lastItem = items[items.length - 1];

        let foundCategory = "";
        for (const category of categories) {
          const match = (menuData[category] || []).some(
            (menuItem) => menuItem.name === lastItem.name,
          );
          if (match) {
            foundCategory = category;
            break;
          }
        }

        if (!foundCategory) {
          if (isActive) {
            setRecommendedItems([]);
            setRecommendedCategory("");
          }
          return;
        }

        const candidates = menuData[foundCategory] || [];

        if (isActive) {
          setRecommendedItems(candidates.slice(0, 4));
          setRecommendedCategory(foundCategory);
        }
      } catch (error) {
        console.error("Failed to load recommendations:", error);
        if (isActive) {
          setRecommendedItems([]);
          setRecommendedCategory("");
        }
      }
    }

    loadRecommendations();
    return () => {
      isActive = false;
    };
  }, [items]);

  return (
    <>
      <AppNavbar />
      <main className="bg-white mt-16    mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            {items.length === 0 ? (
              <CartEmptyState />
            ) : (
              <CartItemsList
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                getItemPrice={getItemPrice}
                usd={usd}
              />
            )}
          </section>

          <CartSummary
            subtotal={subtotal}
            usd={usd}
            isDisabled={items.length === 0}
          />
        </form>

        <CartRelatedProducts
          relatedProducts={relatedProducts}
          recommendedItems={recommendedItems}
          recommendedCategory={recommendedCategory}
          getItemPrice={getItemPrice}
          usd={usd}
        />
      </main>
      <Footer />
    </>
  );
}
