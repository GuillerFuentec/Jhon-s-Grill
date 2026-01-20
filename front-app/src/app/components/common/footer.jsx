import React from "react";

export function Footer() {
  return (
    <>
      <footer class="bg-[#1f2937]  text-white py-12">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between">
            <div class="mb-8 md:mb-0">
              <h3 class="title-font text-2xl font-bold mb-4">
                Jhon's Backyard Grill
              </h3>
              <p class="mb-4 text-white">
                Authentic Mexican flavors in every bite.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="hover:text-white transition">
                  <i data-feather="facebook"></i>
                </a>
                <a href="#" class="hover:text-white transition">
                  <i data-feather="instagram"></i>
                </a>
                <a href="#" class="hover:text-white transition">
                  <i data-feather="twitter"></i>
                </a>
              </div>
            </div>

            <div class="mb-8 md:mb-0">
              <h4 class="font-bold  text-lg mb-4">Hours</h4>
              <p class="text-white">Monday to Saturday</p>
              <p class="text-white">10:00 am - 10:00 pm</p>
              <p class="text-white">Sunday: Closed</p>
            </div>

            <div>
              <h4 class="font-bold text-lg mb-4">Contact</h4>
              <p class="mb-2 text-white">17604 Davenport Rd,</p>
              <p class="mb-2 text-white">Dallas, TX 75252</p>
              <a href="tel:+19727331439" class="hover:text-white transition">
                +1 (972) 733-1439
              </a>
            </div>
          </div>

          <div class="border-t border-red-700 mt-8 pt-8 text-center">
            <p class="text-white">
              &copy; 2025Jhon's Backyard Grill. All rights reserved.
            </p>
            <p class="mt-2">
              <a
                href="/politica-de-cookies.html"
                class="hover:text-white transition text-sm text-blue-300"
              >
                Cookie Policy
              </a>
              <a
                href="/politica-de-privacidad.html"
                class="hover:text-white transition text-sm text-blue-300"
              >
                Privacy Policy
              </a>
            </p>
            <p class="pt-4 text-white">
              Designed by{" "}
              <a
                href="https://guillermocopello.com"
                target="_blank"
                class="text-blue-300"
              >
                Raccoon Studios LLC
              </a>
            </p>
          </div>
        </div>
      </footer>

      <div class="fixed bottom-6 right-6 z-50">
        <a
          href="tel:+19727331439"
          class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center animate-bounce"
        >
          <i data-feather="phone" class="w-6 h-6"></i>
        </a>
      </div>
    </>
  );
}
