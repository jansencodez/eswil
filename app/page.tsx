"use client";

import { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ImageGallery from "../components/Common/ImageGallery";
import NewsItem from "../components/Common/NewsItem";
import image5 from "../assets/images/IMG-20241009-WA0016.jpg";
import image1 from "../assets/images/IMG-20241009-WA0046.jpg";
import image2 from "../assets/images/IMG-20241009-WA0051.jpg";
import image4 from "../assets/images/IMG-20241009-WA0052.jpg";
import image3 from "../assets/images/IMG-20241009-WA0053.jpg";
import baseUrl from "../utils/baseUrl";

const Page: React.FC = () => {
  const imageSet1: StaticImageData[] = [image1, image2];
  const imageSet2: StaticImageData[] = [image3, image4, image5];
  const [update, setUpdate] = useState([]);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch(`${baseUrl}/update`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUpdate(data))
      .catch((error) => console.log("Error fetching updates:", error));
  }, []);

  return (
    <div className="bg-gradient-to-b from-pink-100 to-yellow-100 flex flex-1 relative flex-col min-h-screen mx-2 mt-6">
      {/* Announcement Section */}
      <section className="bg-red-500 text-white py-3 text-center shadow-md">
        <p className="text-lg font-semibold animate-scrollLeft">
          There are no announcements right now.
        </p>
      </section>

      {/* Welcome Section */}
      <section className="bg-white rounded-lg shadow-lg p-6 mt-6 mx-auto w-11/12 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-pink-700 text-center">
          Welcome to <strong>Eswil Preparatory School</strong>
        </h2>
        <p className="text-lg text-center text-gray-600 mt-4">
          The best place for your child&apos;s academic growth.
        </p>
        <hr className="border-t-2 border-pink-600 my-4" />
        <p className="text-xl text-center text-gray-800">
          <strong>Nurturing Minds, Shaping Bright Futures</strong>
        </p>
      </section>

      {/* News and Information Section */}
      <section className=" mt-6 mx-auto  w-11/12">
        <NewsItem data={update} />
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-wrap justify-center gap-6 p-8 mt-6 bg-yellow-50 rounded-lg shadow-md">
        <div className="bg-red-600 text-white py-4 px-8 rounded-lg hover:bg-red-700 transition duration-300">
          <Link
            href="/pages/admissions"
            className="flex items-center space-x-2"
          >
            <span>Join us</span>
            <i className="fa-solid fa-users"></i>
          </Link>
        </div>
        <div className="bg-red-600 text-white py-4 px-8 rounded-lg hover:bg-red-700 transition duration-300">
          <Link href="/learn-more">
            Learn more <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div className="bg-red-600 text-white py-4 px-8 rounded-lg hover:bg-red-700 transition duration-300">
          <Link href="/contact">
            Contact us <i className="fa-solid fa-phone"></i>
          </Link>
        </div>
        <div className="bg-red-600 text-white py-4 px-8 rounded-lg hover:bg-red-700 transition duration-300">
          Our Teachers <i className="fa-solid fa-clipboard-user"></i>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="mt-6 mx-auto max-w-4xl">
        <ImageGallery images={imageSet1} />
      </section>

      {/* About Us Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6  w-11/12 mx-auto">
        <h2 className="text-2xl font-bold text-pink-700">About Us</h2>
        <p className="text-gray-700 mt-4">
          Eswil Preparatory School (PEPS) is located along Mumias-Busia Road at
          Munami Market (Kakamega/Busia county border).
        </p>
        <p className="text-gray-700 mt-4">
          TEPS follows Competency-Based Curriculum (CBC), preparing learners
          with skills and knowledge for a prosperous academic journey.
        </p>
        <p className="text-gray-700 mt-4">
          We are one of the leading schools with a flexible system focused on
          growing innovative and excellent minds.
          <Link
            href="/learn-more"
            className="text-cyan-600 underline hover:text-cyan-800"
          >
            Learn more <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </p>
      </section>

      {/* Director's Welcome Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6 w-11/12 mx-auto">
        <h2 className="text-xl font-semibold text-pink-700">
          Director&apos;s Welcome
        </h2>
        <p className="text-gray-700 mt-4">
          [The director&apos;s welcome note will be added here.]
        </p>
      </section>

      {/* Curriculum Delivery Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6 w-11/12 mx-auto">
        <h2 className="text-2xl font-bold text-pink-700">
          Our Approach to Curriculum Delivery
        </h2>
        <p className="text-gray-700 mt-4">
          TEPS has implemented and adapted the Competency-Based Curriculum (CBC)
          to deliver quality education. Our teachers are skilled in both
          in-class and extracurricular activities.
        </p>
        <table className="table-auto mt-6 w-full">
          <thead>
            <tr className="bg-red-100">
              <th className="px-4 py-2 text-pink-700">Group</th>
              <th className="px-4 py-2 text-pink-700">Classes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">ECDE</td>
              <td className="px-4 py-2">Play Group (PP1 & PP2)</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Lower Primary</td>
              <td className="px-4 py-2">Grade 1 - Grade 3</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Upper Primary</td>
              <td className="px-4 py-2">Grade 4 - Grade 6</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Holistic Support Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6 w-11/12 mx-auto">
        <h2 className="text-2xl font-bold text-pink-700">
          We Are Not Limited to Study Programmes
        </h2>
        <p className="text-gray-700 mt-4">
          Our school offers holistic support including pastoral care, emotional
          support, and a positive school culture.
        </p>
        <ul className="list-disc pl-6 mt-4 text-gray-700">
          <li>
            <strong>Pastoral Care:</strong> We provide a supportive environment
            for every child.
          </li>
          <li>
            <strong>Holistic Support:</strong> We offer emotional, social, and
            individualized care through counseling and mentorship.
          </li>
          <li>
            <strong>Positive School Culture:</strong> We create a respectful and
            encouraging environment for all students.
          </li>
          <li>
            <strong>Health and Safety:</strong> Ensuring the well-being of
            students through comprehensive health and safety programs.
          </li>
        </ul>
        <ImageGallery images={imageSet2} />
      </section>

      {/* Footer Section */}
      <footer className="bg-red-800 text-white p-6 mt-6">
        <div className="flex justify-between">
          <div>
            <h4 className="text-xl font-bold">The Eswil Preparatory School</h4>
            <p className="mt-4 text-sm">
              &copy; {currentYear} The Eswil Preparatory School. All rights
              reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook text-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-youtube text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
