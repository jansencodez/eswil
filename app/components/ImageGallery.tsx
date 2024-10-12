'use client'

import Image from 'next/image';
import React, { useState } from 'react';

function ImageGallery({images}) {
  const [selectedImage, setSetselectedImage] = useState(null);

  const handleClick = (src)=>{
    setSetselectedImage(src);
  }

  const handleClose = ()=>{
    setSetselectedImage(null);
  }
  return (
    <div className='w-ful overflow-x-auto'>
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
              width={"100%"}
              height={"auto"}
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
  )
}

export default ImageGallery