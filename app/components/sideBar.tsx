'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Toggle function to open/close sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to open/close the sidebar on small devices */}
      <button onClick={toggleSidebar} className="toggle-btn border-y-2 bg-yellow-600 border-y-white lg:hidden " id='t-btn'>
        {isOpen ? <i className='fa-solid fa-x'></i> : <i className='fa-solid fa-bars'></i>}
      </button>

      {/* Sidebar for small devices */}
      <div className={`sidebar bg-slate-900 ${isOpen ? 'open' : 'hidden'} lg:hidden h-[100vh] w-[150px] rounded-xl`}>
        <ul className='flex flex-col'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/students">Student Login</Link></li>
          <li><Link href="/admissions">Admissions</Link></li>
          <li><Link href="#events">Events</Link></li>
          <li><a href="#news">News</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link href="../pages/admin">Admin Access</Link></li>
        </ul>
      </div>

      {/* Sidebar for large devices */}
      <div className="sidebar text-white open top-1 left-20 min-w-[100%] h-fit z-100 pb-4 pt-4 bg-slate-900 hidden lg:flex lg:flex-1 border border-y-4 border-y-green-400 rounded-xl">
        <ul className='flex flex-col lg:flex-row justify-evenly items-center w-full'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/students">Student Login</Link></li>
          <li><Link href="/admissions">Admissions</Link></li>
          <li><Link href="#events">Events</Link></li>
          <li><a href="#news">News</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link href="../pages/admin">Admin Access</Link></li>
        </ul>
      </div>

      {/* Overlay to close sidebar when clicking outside (only for small devices) */}
      {isOpen && <div className="overlay lg:hidden fixed inset-0 bg-black opacity-50" onClick={toggleSidebar}></div>}
    </>
  );
}
