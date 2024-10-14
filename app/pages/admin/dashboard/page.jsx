import Image from 'next/image';
import React from 'react';
import image from '../../../assets/FB_IMG_1728226009673.jpg';

function Dashboard() {
  return (
    <div className='grid grid-rows-[200px,1fr] h-screen lg:grid-cols-[1fr,3fr] gap-2 min-h-screen mt-1'>
      {/* Top Section */}
      <section className='grid grid-cols-2 bg-white'>
        <div className='ml-3 mt-9'>
          <div className='outline outline-blue-700 h-[80px] w-[80px] rounded-full bg-black flex justify-center items-center'>
            <Image
              src={image}
              alt="image of admin"
              className='w-[80px] h-[80px] rounded-full'
            />
          </div>
        </div>

        <div className='grid grid-rows-4 gap-2 h-40'>
          <h2><strong>Make updates</strong></h2>
          <button className='text-navy-blue font-bold py-2 px-4 rounded-lg w-full bg-yellow-600 hover:bg-yellow-200 transition duration-200'>
            News & Events
          </button>
          <button className='text-navy-blue font-bold py-2 px-4 rounded-lg w-full bg-yellow-600 hover:bg-yellow-200 transition duration-200'>
            Announcement
          </button>
          <button className='text-navy-blue font-bold py-2 px-4 rounded-lg w-full bg-yellow-600 hover:bg-yellow-200 transition duration-200'>
            Random
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
