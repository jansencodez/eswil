"use client";

import baseUrl from "../../utils/baseUrl";
import useAlert from "../../hooks/useAlert";
import Image from "next/image";
import React, { useState } from "react";
import LoadingButton from "../Common/buttons/LoadingButton";

function Updates() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("News");
  const { Alert, showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  // Handle image file selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Validation
    if (!title || !content || !category) {
      showAlert("Please fill in all the fields");
      setIsLoading(false);
      return;
    }

    if (!image) {
      showAlert("Please upload an image");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await fetch(`${baseUrl}/update`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showAlert(`Successfully created ${category}.`);
      } else {
        const data = await response.json();
        showAlert(data.message || "An error occurred");
      }
    } catch (error: unknown) {
      console.log(error);
      showAlert("Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        className="bg-slate-300 text-black p-6 rounded-lg shadow-md w-full max-w-lg mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-navy-blue">
          Add News/Events
        </h2>

        {/* Title Input */}
        <div className="mb-4">
          <label
            className="block text-slate-gray font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Image Input */}
        <div className="mb-4">
          <label
            className="block text-slate-gray font-bold mb-2"
            htmlFor="image"
          >
            Upload Image (Optional)
          </label>
          <input
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <div className="mt-2">
              <Image
                src={URL.createObjectURL(image)}
                width={250}
                height={350}
                alt="Selected"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Content Input */}
        <div className="mb-4">
          <label
            className="block text-slate-gray font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            id="content"
            placeholder="Enter your content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Category Input */}
        <div className="mb-4">
          <label
            className="block text-slate-gray font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="News">News</option>
            <option value="Announcement">Announcement</option>
            <option value="Event">Event</option>
          </select>
        </div>

        {/* Loading Button */}
        <LoadingButton isLoading={isLoading} onClick={() => {}}>
          Post
        </LoadingButton>
      </form>
      <Alert />
    </div>
  );
}

export default Updates;
