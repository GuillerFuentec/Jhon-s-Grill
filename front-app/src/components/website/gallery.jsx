'use client';

import { useState, useEffect, useCallback } from 'react';

const AUTOPLAY_MS = 4000;

export function Gallery() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Fetch gallery images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/spot/manifest.json', { cache: 'no-cache' });
        if (!response.ok) throw new Error('Failed to fetch manifest');
        const imageList = await response.json();
        setImages(imageList);
      } catch (error) {
        console.error('Error loading gallery:', error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, images.length - 1)));
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-full max-w-5xl mx-auto select-none">
        <div className="overflow-hidden rounded-xl shadow-sm bg-gray-100 h-80 md:h-[28rem] flex items-center justify-center">
          <div className="text-gray-500">Loading gallery...</div>
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full max-w-5xl mx-auto select-none">
        <div className="overflow-hidden rounded-xl shadow-sm bg-gray-100 h-80 md:h-[28rem] flex items-center justify-center">
          <p className="text-center text-red-600">There are no images in the gallery yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-5xl mx-auto select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden rounded-xl shadow-sm bg-gray-100">
        <div
          className="flex transition-transform duration-500 ease-out h-80 md:h-[28rem]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full relative bg-gray-200">
              <img
                src={`/spot/${image}`}
                alt={`Restaurant highlight ${index + 1}`}
                className="w-full h-full object-cover block"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-2 hover:bg-black/80 focus:outline-none transition-colors"
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white p-2 hover:bg-black/80 focus:outline-none transition-colors"
        aria-label="Next image"
      >
        ›
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-yellow-500'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}