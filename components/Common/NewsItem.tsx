"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import logo from "../../assets/icons/eswil-badge-adaptive.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface UpdateData {
  _id: string;
  image: StaticImageData | string; // URL of the image from Cloudinary
  title: string;
  content: string;
  category: string;
}

interface NewsItemProps {
  data: UpdateData[];
}

const NewsItem: React.FC<NewsItemProps> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<{
    image: string | StaticImageData | StaticImport;
    title: string | null;
    content: string | null;
    category: string | null;
  } | null>(null);

  // Handles when a user clicks on a news item
  const handleClick = (update: UpdateData) => {
    setSelectedItem({
      image: update.image || logo, // Fallback to default logo if image is missing
      title: update.title,
      content: update.content,
      category: update.category,
    });
  };

  // Closes the overlay
  const handleClose = () => {
    setSelectedItem(null); // Reset the selected item
  };

  return (
    <div className="w-full h-fit overflow-x-auto">
      <div className="flex flex-wrap gap-6 justify-center p-6">
        {data?.map((update) => (
          <div
            key={update._id}
            className="relative border border-gray-200 bg-white rounded-lg shadow-md max-w-[350px] cursor-pointer hover:scale-105 transition-all duration-75 flex flex-col items-center"
            onClick={() => handleClick(update)}
          >
            <div className="relative w-full h-[250px]">
              <Image
                alt={`Image of ${update.title}`}
                src={update.image || logo}
                width={350}
                height={250}
                className="object-cover w-full h-full rounded-t-lg"
              />
            </div>
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-gray-800 text-center">
                {update.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3 text-center">
                {update.content}
              </p>
              <div className="absolute bottom-0 right-0 p-2 bg-opacity-50 bg-black text-white text-xs rounded-bl-lg">
                {update.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay for clicked image and more details */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-opacity-70 bg-black flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="news-item-overlay-title"
          aria-hidden={!selectedItem}
        >
          <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-[90%] max-h-[80vh] overflow-y-auto">
            <div className="relative w-full max-h-[60vh] overflow-hidden">
              <Image
                src={selectedItem.image}
                alt="Selected Image"
                width={600}
                height={800}
                className="rounded-lg max-w-full max-h-[60vh] mx-auto"
              />
            </div>
            <h3
              id="news-item-overlay-title"
              className="text-3xl font-bold text-gray-800 mt-4"
            >
              {selectedItem.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {selectedItem.category}
            </p>
            <p className="text-lg text-gray-600 mt-4">{selectedItem.content}</p>

            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl bg-black rounded-full p-2"
              onClick={handleClose}
              aria-label="Close"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsItem;
