'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

function Admin() {
  const router=useRouter();
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    router.push('../../pages/admin/dashboard');
  }; 

  return (
    <div>
      <form className="bg-off-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-navy-blue">Admin Access</h2>
        
        <div className="mb-4">
          <label className="block text-slate-gray font-bold mb-2" htmlFor="name">
            Admin User Name
          </label>
          <input
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            type="text"
            id="name"
            placeholder="Enter Admin Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-gray font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            type="email"
            id="password"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-gray font-bold mb-2" htmlFor="grade">
            Select Rank
          </label>
          <select
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            id="grade"
          >
            <option>Rank 1</option>
            <option>Rank 2</option>
          </select>
        </div>

        <button
          className="bg-sunflower-yellow text-navy-blue font-bold py-2 px-4 rounded-lg w-full hover:bg-yellow-600 transition duration-200"
          type="submit"
          onClick={(e)=>handleSubmit(e)}
        >
          Submit
        </button>
      </form>

    </div>
  )
}

export default Admin