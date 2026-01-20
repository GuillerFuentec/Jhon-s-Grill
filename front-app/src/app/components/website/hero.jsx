import React from "react";

export function Hero() {
  return (
    <>
      <section
        id="inicio"
        class="hero-gradient min-h-screen flex items-center justify-center text-white"
      >
        <div class="container mx-auto px-4 text-center" data-aos="fade-up">
          <h1 class="title-font text-4xl md:text-6xl font-bold mb-4">
            We are cooking now
          </h1>
          <p class="text-white text-xl md:text-2xl mb-8">
            Traditional flavors that take you straight to Mexico
          </p>
          <div class="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="tel:+19727331439"
              class="bg-amber-500 text-white hover:bg-amber-600 font-bold py-3 px-6 rounded-full text-lg flex items-center justify-center gap-2 transition"
            >
              <i data-feather="phone"></i> Call and Pick Up
            </a>
            <a
              href="#menu"
              class="bg-white text-black hover:bg-gray-100 font-bold py-3 px-6 rounded-full text-lg transition"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
