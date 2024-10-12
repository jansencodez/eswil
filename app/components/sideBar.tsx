'use client'

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
      {/* Button to open/close the sidebar */}
    <button onClick={toggleSidebar} className="toggle-btn border-y-2 border-y-white lg:hidden md:hidden" id='t-btn'>
        {isOpen==true ? <i className='fa-solid fa-x'></i> : <i className='fa-solid fa-bars'></i>}
      </button>

      {/* Sidebar */}
      {isOpen &&
      <div className={`pt-4 sidebar bg-slate-900  ${!isOpen ? '' : 'open'} flex md:hidden lg:hidden h-[100vh] w-[150px] rounded-xl`}>
        <ul className=' flex flex-col'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="../pages/students">Student Login</Link></li>
          <li><Link href="../pages/admissions">Admissions</Link></li>
          <li><Link href="#contact">Events</Link></li>
          <li><a href="#contact">News</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link href="../pages/admin/">Admin Access</Link></li>
        </ul>
      </div>}

      <div className={`sidebar sticky top-10 left-20 right-0 h-fit z-100 pb-5 pt-4 bg-slate-900 hidden lg:flex md:flex open border border-y-4 border-y-green-400 rounded-xl`}>
        <ul className=' flex flex-col lg:flex-row md:flex-row justify-evenly items-center w-[100%]'>
        <li><Link href="/">Home</Link></li>
          <li><Link href="../pages/students">Student Login</Link></li>
          <li><Link href="../pages/admissions">Admissions</Link></li>
          <li><Link href="#contact">Events</Link></li>
          <li><a href="#contact">News</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link href="../pages/admin/">Admin Access</Link></li>
        </ul>
      </div>

      {/* Optional Overlay to close sidebar when clicking outside */}
      {isOpen && <div className="overlay lg:hidden md:hidden" onClick={toggleSidebar}></div>}
    </>
  );
}
