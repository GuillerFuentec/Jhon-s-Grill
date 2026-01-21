import React from "react";

export function Hero() {
  return (
    <>
      <section
        id="home"
        className="hero-gradient min-h-screen flex items-center justify-center text-white"
      >
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h1 className="title-font text-4xl md:text-6xl font-bold mb-4">
            We are cooking now
          </h1>
          <p className="text-white text-xl md:text-2xl mb-8">
            Traditional flavors that take you straight to Mexico
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="tel:+19727331439"
              className="bg-amber-500 text-white hover:bg-amber-600 font-bold py-3 px-6 rounded-full text-lg flex items-center justify-center gap-2 transition"
            >
              <i data-feather="phone"></i> Call and Pick Up
            </a>
            <a
              href="#menu"
              className="bg-white text-black hover:bg-gray-100 font-bold py-3 px-6 rounded-full text-lg transition"
            >
              View Menu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
