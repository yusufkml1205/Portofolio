"use client";

import { useState } from "react";
import Image from "next/image";
import { getImgPath } from "@/utils/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-6">
      {/* Main Gallery Image */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-xl cursor-zoom-in bg-gray-100"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={images[selectedImage].src}
          alt={images[selectedImage].alt}
          width={800}
          height={500}
          className="w-full h-64 md:h-96 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === index
                ? "border-primary scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={100}
              height={80}
              className="w-24 h-20 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <div className="flex justify-center gap-4">
          <button
            onClick={prevImage}
            className="bg-primary text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
          >
            <svg
              width="20"
              height="20"
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
            className="bg-primary text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
          >
            <svg
              width="20"
              height="20"
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
        </div>
      )}

      {/* Modal for Fullscreen View */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl z-10"
          >
            ✕
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
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

          <div className="relative max-w-4xl max-h-full">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-screen object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
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

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/70 px-4 py-2 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
