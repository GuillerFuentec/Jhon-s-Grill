"use client";

export function CartEmptyState() {
  return (
    <div className="mt-6 rounded-md border border-dashed border-gray-300 p-6 text-center">
      <p className="text-sm text-gray-600">
        Your cart is empty. Add items from the menu to get started.
      </p>
      <a
        href="/menu"
        className="mt-4 inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Go to Menu
      </a>
    </div>
  );
}
