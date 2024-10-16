'use client'
import Image from 'next/image';
import React, { useState } from 'react'

function Updates() {
  const [image, setImage] = useState(null); // State to hold the selected image
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('News');

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0])); // Create a URL for the selected image
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here (e.g., send to an API)
    console.log({ title, content, category, image });
  };

  return (
    <div>
      <form className="bg-off-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-navy-blue">Add News/Events</h2>

        <div className="mb-4">
          <label className="block text-slate-gray font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update state on change
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-gray font-bold mb-2" htmlFor="image">
            Upload Image
          </label>
          <input
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            type="file"
            id="image"
            accept="image/*" // Accept only image files
            onChange={handleImageChange} // Handle image change
            required
          />
          {image && (
            <div className="mt-2">
              <Image src={image} width={250} height={350} alt="Selected" className="w-full h-auto rounded-lg" />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-slate-gray font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            id="content"
            placeholder="Enter your content"
            value={content}
            onChange={(e) => setContent(e.target.value)} // Update state on change
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-gray font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Update state on change
          >
            <option value="News">News</option>
            <option value="Event">Event</option>
          </select>
        </div>

        <button
          className="bg-sunflower-yellow text-navy-blue font-bold py-2 px-4 rounded-lg w-full hover:bg-yellow-600 transition duration-200"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Updates;
