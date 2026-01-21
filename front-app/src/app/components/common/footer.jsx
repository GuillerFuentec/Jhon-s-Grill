import React from "react";

export function Footer() {
  return (
    <>
      <footer className="bg-[#1f2937]  text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="title-font text-2xl font-bold mb-4">
                Jhon's Backyard Grill
              </h3>
              <p className="mb-4 text-white">
                Authentic Mexican flavors in every bite.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition">
                  <i data-feather="facebook"></i>
                </a>
                <a href="#" className="hover:text-white transition">
                  <i data-feather="instagram"></i>
                </a>
                <a href="#" className="hover:text-white transition">
                  <i data-feather="twitter"></i>
                </a>
              </div>
            </div>

            <div className="mb-8 md:mb-0">
              <h4 className="font-bold  text-lg mb-4">Hours</h4>
              <p className="text-white">Monday to Saturday</p>
              <p className="text-white">10:00 am - 10:00 pm</p>
              <p className="text-white">Sunday: Closed</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <p className="mb-2 text-white">17604 Davenport Rd,</p>
              <p className="mb-2 text-white">Dallas, TX 75252</p>
              <a href="tel:+19727331439" className="hover:text-white transition">
                +1 (972) 733-1439
              </a>
            </div>
          </div>

          <div className="border-t border-red-700 mt-8 pt-8 text-center">
            <p className="text-white">
              &copy; 2025Jhon's Backyard Grill. All rights reserved.
            </p>
            <p className="mt-2">
              <a
                href="/politica-de-cookies.html"
                className="hover:text-white transition text-sm text-blue-300"
              >
                Cookie Policy
              </a>
              <a
                href="/politica-de-privacidad.html"
                className="hover:text-white transition text-sm text-blue-300"
              >
                Privacy Policy
              </a>
            </p>
            <p className="pt-4 text-white">
              Designed by{" "}
              <a
                href="https://guillermocopello.com"
                target="_blank"
                className="text-blue-300"
              >
                Raccoon Studios LLC
              </a>
            </p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="tel:+19727331439"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center animate-bounce"
        >
          <i data-feather="phone" className="w-6 h-6"></i>
        </a>
      </div>
    </>
  );
}
