"use client";

import React, { useState } from "react";

const ContactPage = () => {
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "email">(
    "email"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If the selected contact method is email, we can submit via the mailto link
    if (contactMethod === "email") {
      const { name, subject, message } = formData;
      const mailtoLink = `mailto:contact@eswilpreparatory.com?subject=${encodeURIComponent(
        subject
      )}&body=Subject:%20${encodeURIComponent(
        subject
      )}%0A%0AHello,%20I%20am%20${encodeURIComponent(
        name
      )}.%20${encodeURIComponent(message)}`;
      window.location.href = mailtoLink;
    }
    // For WhatsApp, we create a WhatsApp link to open the chat with a pre-filled message
    else if (contactMethod === "whatsapp") {
      const { name, subject, message } = formData;
      const whatsappLink = `https://wa.me/+254721135957?text=*Subject:%20${encodeURIComponent(
        subject
      )}*%0A%0AHello,%20I%20am%20${encodeURIComponent(
        name
      )}.%20${encodeURIComponent(message)}`;
      window.open(whatsappLink, "_blank");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 sm:px-12 md:px-20">
      <h1 className="text-4xl font-bold text-center text-red-700 mb-8">
        Contact Us
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-pink-600 mb-6">
          School Details
        </h2>

        {/* School Contact Information */}
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Address
            </h3>
            <p className="text-gray-600">
              Eswil Preparatory School, <br />
              1234 School Road, Nairobi, Kenya
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600">+2547 211 359 57</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600">contact@eswilpreparatory.com</p>
          </div>
        </div>

        {/* Contact Method Selection */}
        <div className="flex justify-center space-x-8 mb-8">
          <button
            className={`py-2 px-6 rounded-md ${
              contactMethod === "email"
                ? "bg-pink-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setContactMethod("email")}
          >
            Email
          </button>
          <button
            className={`py-2 px-6 rounded-md ${
              contactMethod === "whatsapp"
                ? "bg-pink-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setContactMethod("whatsapp")}
          >
            WhatsApp
          </button>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Get in Touch
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-800 font-semibold"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {contactMethod === "email" && (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-800 font-semibold"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-800 font-semibold"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter subject"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-800 font-semibold"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Write your message"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-6 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
