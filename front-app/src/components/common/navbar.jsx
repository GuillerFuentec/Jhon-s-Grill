"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { config } from "@/config/config.js";
import Dropdown from "@/components/interactive_components/dropdown";
import { useCart } from "@/contexts/cart/cartContext";
import { useAuth } from "@/contexts/auth/authContext";

export function Navbar() {
  const { items, getTotalItems, getSubtotal, removeItem } = useCart();
  const { isAuthenticated } = useAuth();

  const cartItems = items.map(item => ({
    type: 'div',
    label: `${item.name} x${item.quantity} - $${(item.price?.single || 0) * item.quantity}`,
  }));

  if (cartItems.length === 0) {
    cartItems.push({ type: 'div', label: 'No items in cart' });
  } else {
    cartItems.push({ type: 'div', label: `Subtotal: $${getSubtotal().toFixed(2)}` });
    cartItems.push({
      type: 'link',
      label: isAuthenticated ? 'Checkout' : 'Login to Checkout',
      href: isAuthenticated ? '/checkout' : '/login'
    });
  }
  return (
    <Disclosure
      as="nav"
      className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-600 focus:outline-hidden focus:ring-inset dark:hover:bg-white/5 dark:hover:text-white dark:focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block text-white size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <a href="#home">
                <Image alt="logo" src="/logo.png" width={48} height={48} />
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#home"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
              >
                Home
              </a>
              <a
                href="#menu"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
              >
                Menu
              </a>
              <a
                href="#about"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
              >
                About
              </a>
              <a
                href={config.CONTACT_PHONE_LINK}
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
              >
                Contact
              </a>
              <a
                href="#visit-us"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:text-white"
              >
                Visit Us
              </a>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Dropdown
              trigger={
                <>
                  <span className="sr-only">Shopping cart</span>
                  <ShoppingCartIcon aria-hidden="true" className="text-white size-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </>
              }
              items={cartItems}
              className="mr-3 relative"
            />
            <Dropdown
              trigger={
                <>
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="text-white size-6" />
                </>
              }
              items={[
                { type: 'div', label: 'No new notifications' },
                { type: 'link', label: 'View All', href: '/notifications' },
              ]}
            />

            <Dropdown
              trigger={
                <>
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
                  />
                </>
              }
              items={[
                { type: 'link', label: 'Your profile', href: '/profile' },
                { type: 'link', label: 'Settings', href: '/settings' },
                { type: 'button', label: 'Sign out', onClick: () => console.log('Sign out') },
              ]}
              className="ml-3"
            />
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pt-2 pb-4">
          <DisclosureButton
            as="a"
            href="#home"
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Home
          </DisclosureButton>
          <div className="bg-red-800 hover:bg-red-700 active:bg-red-600 mr-2.5 ml-1 rounded-md">
            <DisclosureButton
              as="a"
              href="#menu"
              className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Menu
            </DisclosureButton>
          </div>
          <DisclosureButton
            as="a"
            href="#about"
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white"
          >
            About
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href={config.CONTACT_PHONE_LINK}
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Contact
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="#visit-us"
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Visit Us
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
