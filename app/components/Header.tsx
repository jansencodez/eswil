import Image from 'next/image'
import React from 'react';
import '@fortawesome/fontawesome-free'

function Header() {
  return (
    <div className='flex flex-row justify-between items-center p-2 bg-fuchsia-900 h-20 fixed top-0 right-0 left-0 z-50'>
      <div className='w-20 h-14 
      hover:opacity-80 hover:cursor-pointer bg-pink-300 flex rounded-2xl justify-center items-center'>
        <li className='fa-solid fa-bars'></li>
      </div>
      <div className='bg-pink-300 flex-1 h-14 '>
        
      </div>
    </div>
  )
}

export default Header