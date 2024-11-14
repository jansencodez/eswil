"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to open/close sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to open/close the sidebar on small devices */}
      <button
        onClick={toggleSidebar}
        className="toggle-btn bg-yellow-300  lg:hidden "
        id="t-btn"
      >
        {isOpen ? (
          <i className="fa-solid fa-x"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </button>

      {/* Sidebar for small devices */}
      <div
        className={`sidebar bg-white ${
          isOpen ? "open" : "hidden"
        } lg:hidden h-[100vh] w-[250px] rounded-xl`}
      >
        <ul className="flex flex-col">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/student/login">Student Login</Link>
          </li>
          <li>
            <Link href="/admissions">Admissions</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <a href="#news">News</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <Link href="/teacher/login">Teacher</Link>
          </li>
          <li>
            <Link href="/admin/login">Admin</Link>
          </li>
        </ul>
      </div>

      {/* Sidebar for large devices */}
      <div className="sidebar text-slate-950 open top-4 left-28 max-w-[98%] h-fit z-100 pb-4 pt-4 bg-white hidden lg:flex lg:flex-1  rounded-xl">
        <ul className="flex flex-col lg:flex-row justify-evenly items-center w-full text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/student/login">Student Login</Link>
          </li>
          <li>
            <Link href="/admissions">Admissions</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <Link href="/admin/login">Admin Access</Link>
          </li>
        </ul>
      </div>

      {/* Overlay to close sidebar when clicking outside (only for small devices) */}
      {isOpen && (
        <div
          className="overlay lg:hidden fixed inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
