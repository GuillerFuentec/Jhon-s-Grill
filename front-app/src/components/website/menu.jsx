import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Menu as MenuComponent } from "../../scripts/menu/menu.js";

export function Menu() {
  return (
    <section id="menu" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1
          className="title-font text-3xl md:text-4xl font-bold text-center text-red-600 mb-6"
          data-aos="fade-up"
        >
          Our Menu
        </h1>

        {/* Swipe Hint */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-sm font-bold text-black uppercase tracking-wide">
            Swipe to see more options in the menu
          </span>

          <ArrowRightIcon className="w-6 h-6 text-red-600 animate-swipe-right" />
        </div>

        <MenuComponent />
      </div>
    </section>
  );
}