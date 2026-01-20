'use client'
import { useState } from "react";

export function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="contacto" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2
          className="title-font text-3xl md:text-4xl font-bold text-center text-red-600 mb-12"
          data-aos="fade-up"
        >
          Visit Us
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2" data-aos="fade-right">
            <div className="bg-gray-100 p-6 rounded-lg h-full">
              <h3 className="text-2xl font-bold text-red-600 mb-4">
                Contact Information
              </h3>

              <div className="mb-6">
                <div className="flex items-start mb-4 mt-2">
                  <i
                    data-feather="map-pin"
                    className="mr-4 text-gray-700 mt-1"
                  ></i>
                  <div>
                    <h4 className="font-bold">Address</h4>
                    <p>
                      17604 Davenport Rd,
                      <br />
                      Dallas, TX 75252
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-4 mt-2">
                  <i
                    data-feather="phone"
                    className="mr-4 text-gray-700 mt-1"
                  ></i>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p>+1 (972) 733-1439</p>
                  </div>
                </div>

                <div className="flex items-start mt-2">
                  <i
                    data-feather="clock"
                    className="mr-4 text-gray-700 mt-1"
                  ></i>
                  <div>
                    <h4 className="font-bold">Hours</h4>
                    <p>
                      Monday to Saturday
                      <br />
                      7:00 am - 7:00 pm
                    </p>
                    <p>Sunday - Closed</p>
                  </div>
                </div>
              </div>

              <button
                onClick={openModal}
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition"
              >
                <i data-feather="map" className="mr-2"></i> Open in Maps
              </button>

              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                    <h3 className="text-lg font-bold mb-4 text-center">
                      Open location in:
                    </h3>
                    <div className="flex flex-col gap-4">
                      <a
                        href="https://maps.google.com?q=17604+Davenport+Rd,+Dallas,+TX+75252"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                      >
                        Google Maps
                      </a>
                      <a
                        href="https://maps.apple.com/?q=17604+Davenport+Rd,+Dallas,+TX+75252"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition"
                      >
                        Apple Maps
                      </a>
                    </div>
                    <button
                      onClick={closeModal}
                      className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* GALLERY section */}
          <div className="md:w-1/2" data-aos="fade-left">
            <div className="bg-gray-100 p-6 rounded-lg h-full">
              <div className="text-center mb-10">
                <h2 className="title-font text-red-600 text-4xl font-bold">
                  Our restaurant
                </h2>
              </div>

              <div
                id="galleryCarousel"
                className="relative w-full max-w-5xl mx-auto select-none"
              >
                <div className="overflow-hidden rounded-xl shadow-sm bg-gray-100">
                  <ul
                    id="galleryTrack"
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: "translateX(0)" }}
                  >
                    {/* Slides injected by ./scripts/gallery.js */}
                  </ul>
                </div>

                <button
                  id="galleryPrev"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-2 hover:bg-black/80 focus:outline-none"
                  aria-label="Previous"
                >
                  &lt;
                </button>
                <button
                  id="galleryNext"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-2 hover:bg-black/80 focus:outline-none"
                  aria-label="Next"
                >
                  &gt;
                </button>

                <div
                  id="galleryDots"
                  className="flex justify-center gap-2 mt-4"
                ></div>
              </div>

              <p
                id="galleryEmptyMsg"
                className="hidden text-center text-red-600 mt-6"
              >
                There are no images in the gallery yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
