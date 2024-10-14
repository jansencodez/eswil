// dashboard/DashboardLayout.js

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import image1 from "../../../assets/FB_IMG_1728226009673.jpg";

const layout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      
      <div className="dashboard-content">
        <header>
          <nav className='flex flex-row bg-slate-800 p-3 text-white text-xs'>
            <section className='flex-0'>
              <Image 
              src={image1}
              alt='logo'
              className='flex contain w-[50px] h-[50px] outline-purple-900 outline-8 rounded-full
              '
            />
            </section>
            <section className='flex flex-1 pl-2'>
              <ul className='flex flex-row flex-1 justify-between items-center'>
                <li className='p-3 hover:bg-slate-400 hover:text-black'><Link href="./dashboard">Dashboard</Link></li>
                <li className='p-3 hover:bg-slate-400 hover:text-black'><Link href="/students">Students</Link></li>
                <li className='p-3 hover:bg-slate-400 hover:text-black'><Link href="/teachers">Teachers</Link></li>
                <li className='p-3 hover:bg-slate-400 hover:text-black'><Link href="/reports">Reports</Link></li>
                <li className='p-3 hover:bg-slate-400 hover:text-black'><Link href="/settings">Settings</Link></li>
              </ul>
            </section>
          </nav>
        </header>

        <main>
          {children} {/* This renders the specific content for each page */}
        </main>
      </div>
    </div>
  );
};

export default layout;
