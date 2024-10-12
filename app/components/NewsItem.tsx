'use client';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import React, { useState } from 'react';
import image1 from "../assets/images/IMG-20241009-WA0046.jpg";
import image2 from "../assets/images/IMG-20241009-WA0050.jpg";
import image3 from "../assets/images/IMG-20241009-WA0023.jpg";

interface ImageItem {
  src: StaticImageData;
  text: string;
}

const NewsItem: React.FC = () => {
  const images: ImageItem[] = [
    { src: image1, text: "Eswil pupils' graduation: Hosted at KAG church Munami" },
    { src: image2, text: 'some text about event' },
    { src: image3, text: 'some text about event' },
  ];

  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);

  const handleClick = (src: StaticImageData) => {
    setSelectedImage(src);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className='w-full overflow-x-auto '>
      <div className='flex space-x-4 p-4 relative'>
        {images.map((image, index) => (
          <div
            key={index}
            className='min-w-[300px] h-[260px] relative cursor-pointer bg-purple-100 p-2 overflow-hidden whitespace-nowrap'
            onClick={() => handleClick(image.src)}
          >
            <Image
              alt={`Image ${index + 1}`}
              src={image.src}
              fill
              className='rounded-lg shadow-md max-h-[200px] object-cover'
            />
            <p className='absolute bottom-[10px] shadow-inner border border-e-4 border-s-4 animate-scrollLeft max-w-100 text-clip'>
              {image.text}
            </p>
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
              width={1000}  // Fixed width, should be a number
              height={600}  // Fixed height, should be a number
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

export default NewsItem;
