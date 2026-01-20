# Menu Component for Next.js

This module provides a React component and hook for rendering restaurant menus in Next.js applications.

## Features

- Fetches menu data from a JSON file in the public folder
- Renders category navigation buttons
- Displays menu items in a responsive grid with images, descriptions, and prices
- Supports lazy loading images with fallbacks
- Integrates with AOS (Animate On Scroll) if available
- Built with React hooks for state management

## Setup

Place your `manifest.json` file in `public/api/manifest.json` with this structure:

```json
{
  "currency": "USD",
  "Burgers": [
    {
      "name": "Classic Hamburger",
      "description": "Classic burger...",
      "imgUrl": "/path/to/image.jpg",
      "imgNetUrl": "https://fallback.image.url",
      "price": {
        "single": 8.77,
        "platter": 10.5
      }
    }
  ]
}
```

## Usage

### Using the Menu Component

```jsx
import { Menu } from '@/app/scripts/menu/menu.js';

export default function MenuPage() {
  return (
    <div>
      <h1>Our Menu</h1>
      <Menu /> {/* Uses /api/manifest.json by default */}
    </div>
  );
}
```

### Using the useMenu Hook

```jsx
import { useMenu, MenuNav, MenuGrid } from '@/app/scripts/menu/menu.js';

export default function CustomMenu() {
  const { categories, activeCategory, setActiveCategory, items, error } = useMenu();

  if (error) return <div>{error}</div>;

  return (
    <div>
      <MenuNav
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <MenuGrid items={items} />
    </div>
  );
}
```

## Exports

- `Menu`: Complete menu component
- `useMenu`: Hook for custom menu logic
- `MenuNav`: Navigation component
- `MenuGrid`: Grid component
- `MenuCard`: Individual menu item card
- `MenuImage`: Image component with fallbacks
- `priceToText`: Utility function for formatting prices
- `slug`: Utility function for URL slugs

## Styling

Uses Tailwind CSS classes. Ensure your Next.js app includes Tailwind.

## Dependencies

- React
- Next.js
- Tailwind CSS (optional but recommended)