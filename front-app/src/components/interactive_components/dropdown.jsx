"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function Dropdown({ trigger, items, className = "" }) {
  return (
    <Menu as="div" className={`relative inline-block ${className}`}>
      <MenuButton className="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus-visible:outline-indigo-500">
        {trigger}
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
      >
        <div className="py-1">
          {items.map((item, index) => (
            <MenuItem key={index} as={item.type === 'link' ? 'a' : item.type === 'button' ? 'button' : 'div'} {...(item.type === 'link' ? { href: item.href || '#' } : item.type === 'button' ? { onClick: item.onClick } : {})} className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white">
              {item.label}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
