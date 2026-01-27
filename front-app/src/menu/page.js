import { Menu } from '@/scripts/menu/menu.js';

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>
      <Menu />
    </div>
  );
}