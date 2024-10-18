
import React from 'react';
import '@fortawesome/fontawesome-free'
import Sidebar from './sideBar';
import Image from 'next/image';
import image1 from "../assets/FB_IMG_1728226009673.jpg";

function Header() {
  return (
    <div className='flex flex-row justify-between items-center p-2 bg-pink-100 border border-b-black h-20 sticky top-0 right-0 left-0 z-50'>
      <div>
        <Image 
          src={image1}
          alt='logo'
         className='flex contain w-[60px] h-[60px] outline outline-black outline-2 rounded-full
              '
        />
      </div>
      <div className='w-36 flex '>
      <Sidebar/></div>
    </div>
  )
}

export default Header