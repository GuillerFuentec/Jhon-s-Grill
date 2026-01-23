

import { Menu as MenuComponent } from '../../scripts/menu/menu.js';

export function Menu() {
  return (
    <section className="py-16 bg-white">
      <div id="menu" className="container mx-auto px-4">
        <MenuComponent />
      </div>
    </section>
  );
}
