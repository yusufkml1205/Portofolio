"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getImgPath } from "@/utils/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface InteractiveGalleryProps {
  images: GalleryImage[];
}

const InteractiveGallery: React.FC<InteractiveGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsZoomed(false);
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedImage]);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const openModal = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
    setIsZoomed(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-6">
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-zoom-in"
            onClick={() => openModal(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v0m0 4v0m0 4v0"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Image Number Badge */}
            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center text-gray-600 text-sm">
        Click on any image to view in full screen • {images.length} images
        available
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="no-orange-effect absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Zoom Button */}
          <button
            onClick={toggleZoom}
            className="no-orange-effect absolute top-6 right-20 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              {isZoomed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v0m0 4v0m0 4v0"
                />
              )}
            </svg>
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="no-orange-effect absolute left-6 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-4 hover:bg-black/70"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="no-orange-effect absolute right-6 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-4 hover:bg-black/70"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Main Image Container */}
          <div
            className={`relative max-w-7xl max-h-full ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={toggleZoom}
          >
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={1200}
              height={800}
              className={`max-w-full max-h-screen object-contain transition-transform duration-300 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
            />
          </div>

          {/* Image Info & Counter */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm">
            <div className="flex items-center gap-4 text-sm">
              <span>{images[selectedImage].alt}</span>
              <span className="text-gray-300">•</span>
              <span>
                {selectedImage + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs">
            Use ← → arrows to navigate • ESC to close • Click to zoom
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveGallery;
