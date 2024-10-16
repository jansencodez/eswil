"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

function Dashboard() {
  const router = useRouter();
  const updates = ()=>{router.push("./dashboard/updates")};
  return (
    <div className='grid grid-rows-[200px,1fr] h-screen lg:grid-cols-[1fr,3fr] gap-2 min-h-screen mt-1'>
      {/* Top Section */}
      <section className='flex flex-col bg-white flex-1 justify-center items-center'>
        <div className='grid grid-rows-4 gap-2 h-40 justify-center  bg-blue-100 w-[90%] md:w-[50%] pb-5 rounded-sm shadow-sm'>
          <h2 className='flex justify-center items-center'><strong>Make updates</strong></h2>
          <button onClick={updates} className='text-white flex justify-center items-center align-middle font-bold py-2 px-4 rounded-lg w-[240px] bg-yellow-600 hover:bg-yellow-200 transition duration-200'>
            News & Events
          </button>
          <button className='text-white flex justify-center items-center align-middle font-bold py-2 px-4 rounded-lg w-[240px] bg-yellow-600 hover:bg-yellow-200 transition duration-200'>
            Announcement
          </button>
          <button className='text-white  flex justify-center items-center align-middle font-bold py-2 px-4 rounded-lg w-[240px] bg-yellow-600 hover:bg-yellow-200 transition duration-200 '>
            Staff Registration
          </button>
        </div>
      </section>

      {/* Second Section */}
      <section className='bg-slate-600 flex flex-1'>
        Content here
      </section>
    </div>
  );
}

export default Dashboard;
