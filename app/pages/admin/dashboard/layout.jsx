// dashboard/DashboardLayout.js
import Link from 'next/link';
import React from 'react';


const layout = ({ children }) => {
  
  return (
    <div className="dashboard-layout">
      
      <div className="dashboard-content">
        <header>
          <nav className='flex flex-row bg-slate-800 p-3 text-white text-xs'>
            <section className='flex flex-1 pl-2'>
              <ul className='flex flex-row flex-1 justify-between items-center'>
                <li className='p-3 hover:bg-slate-400 hover:text-black'><Link href="../../../"><i className='fa-solid fa-school'></i></Link></li>
                <li className='p-3 hover:bg-slate-400 hover:text-black'><Link href="/students">Students</Link></li>
                <li className='p-3 hover:bg-slate-400 hover:text-black'><Link href="/teachers">Teachers</Link></li>
                <li className='p-3 hover:bg-slate-400 hover:text-black'><Link href="/reports">Reports</Link></li>
                <li className='p-3 hover:bg-slate-400 hover:text-black'><Link href="/settings">Settings</Link></li>
              </ul>
            </section>
          </nav>
        </header>

        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
