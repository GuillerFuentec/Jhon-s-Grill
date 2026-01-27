import { Menu as MenuComponent } from "../../scripts/menu/menu.js";

export function Menu() {
  return (
    <section id="menu" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1
          id="menu"
          className="title-font text-3xl md:text-4xl font-bold text-center text-red-600 mb-12"
          data-aos="fade-up"
        >
          Our Menu
        </h1>
        <MenuComponent />
      </div>
    </section>
  );
}
