import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

export function Video() {
  return (
    <section id="video" className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="title-font text-black! text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
          Tour Jhon's Backyard Grill Kitchen
        </h2>

        <div
          className="relative mx-auto rounded-xl overflow-hidden shadow-lg bg-black
                max-w-93.75 pt-[77.33%] 
                md:max-w-125 lg:max-w-112.5 md:aspect-video md:pt-0 md:max-h-[65vh]"
        >
          <video
            id="promoVideo"
            className="absolute inset-0 w-full h-full object-cover"
            preload="metadata"
            poster="/menu/tacos/tacos-platte.jpg"
            src="/kitchen/promo.mp4"
            playsInline
            muted
            loop
            controls
          ></video>

          <button
            id="playFallbackBtn"
            className="hidden absolute inset-0 m-auto h-14 w-14 md:h-16 md:w-16 rounded-full bg-white/70 backdrop-blur text-black text-xl font-bold"
          >
            Play
          </button>
        </div>

        <p className="text-center text-xs md:text-sm text-gray-600 mt-3 md:mt-4">
          If autoplay does not start, tap Play or
          <a
            id="videoDownloadLink"
            href="/kitchen/promo.mp4"
            className="underline"
          >
            {" "}download the video
          </a>
          .
        </p>
      </div>
    </section>
  );
}
