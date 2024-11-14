"use client";

import React from "react";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-slate-300 via-slate-500 to-slate-800 text-white">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-xl space-y-6">
        <h1 className="text-4xl font-bold text-red-600">404 - Not Found</h1>
        <p className="text-lg text-gray-700">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
