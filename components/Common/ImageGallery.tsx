"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

interface ImageGalleryProps {
  images: StaticImageData[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(
    null
  );

  const handleClick = (src: StaticImageData) => {
    setSelectedImage(src);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Image thumbnails */}
      <div className="flex flex-wrap gap-6 justify-center p-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="w-72 h-48 relative cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => handleClick(src)}
          >
            <Image
              alt={`Image ${index + 1}`}
              src={src}
              fill
              className="object-cover rounded-lg"
            />
            {/* Hover effect */}
            <div className="absolute inset-0 bg-black bg-opacity-25 transition-all duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
              <i className="fa-solid fa-magnifying-glass text-white text-4xl"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay for selected image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-full max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-xl p-2">
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={800}
              height={600}
              className="object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={handleClose}
              aria-label="Close Image"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
