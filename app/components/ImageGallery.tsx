'use client';

import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';

interface ImageGalleryProps {
  images: StaticImageData[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);

  const handleClick = (src: StaticImageData) => {
    setSelectedImage(src);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className='w-full overflow-x-auto'>
      <div className='flex space-x-4 p-4'>
        {images.map((src, index) => (
          <div
            key={index}
            className='min-w-[300px] h-[200px] relative cursor-pointer'
            onClick={() => handleClick(src)}
          >
            <Image
              alt={`Image ${index + 1}`}
              src={src}
              fill
              className='rounded-lg shadow-md object-cover'
            />
          </div>
        ))}
      </div>

      {/* Overlay for clicked image */}
      {selectedImage && (
        <div className="inset-0 overlay bg-opacity-70 flex items-center justify-center z-50 w-auto h-auto">
          <div>
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={1000}  // Type should be number
              height={600}  // Type should be number
              className="rounded-lg"
            />
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={handleClose}
            >
              <i className='fa-solid fa-x'></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
