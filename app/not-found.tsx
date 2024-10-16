'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

function NotFound() {
  const router = useRouter();

  return (
    <div className='text-center flex flex-1 flex-col bg-slate-400 faded-div text-red-600  bg-gradient-to-br pt-4 pb-4 justify-center items-center mt-[50%] mb-[50%]'>
      <h1>Not Found</h1>
      <p>Oops! Page does not exist</p>
      <button onClick={() => router.back()} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Go Back
      </button>
    </div>
  );
}

export default NotFound;
