'use client';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import React, { useState } from 'react';
import image1 from "../assets/images/IMG-20241009-WA0046.jpg";
import image2 from "../assets/images/IMG-20241009-WA0050.jpg";
import image3 from "../assets/images/IMG-20241009-WA0023.jpg";

interface ImageItem {
  src: StaticImageData;
  content: string;
  title: string;
}

const NewsItem: React.FC = () => {
  const images: ImageItem[] = [
    { src: image1, title:'graduation', content: "Eswil pupils' graduation: Hosted at KAG church Munami",  },
    { src: image2, title:'graduation', content: "Eswil pupils' graduation: Hosted at KAG church Munami", },
    { src: image3, title:'graduation', content: "Eswil pupils' graduation: Hosted at KAG church Munami",},
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
          <div key={index} className='relative border border-e-4 border-s-4 bg-white min-w-[300px] h-[260px] cursor-pointer  p-2  pb-9'>
            <h3 className='relative  w-full'>
                {image.title}
              </h3>
            <div
              className=' '
              onClick={() => handleClick(image.src)}
            >
              <Image
                alt={`Image ${index + 1}`}
                src={image.src}
                width={350}
                height={350}
                className='relative rounded-sm max-h-[200px] object-cover'
              />
            </div>
            <div className='relative bg-gray-200 w-full h-[20px] mt-[2px] overflow-hidden whitespace-nowrap'>
              <p className='absolute bottom-0  animate-scrollLeft text-clip text-blue-700'>
                  {image.content}
                </p>
            </div>
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
              width={400}  // Fixed width, should be a number
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
