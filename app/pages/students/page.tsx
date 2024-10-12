import React from 'react'

function page() {
  return (
    <div>
      <form className="bg-off-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-navy-blue">Student Login</h2>
        
        <div className="mb-4">
          <label className="block text-slate-gray font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            type="text"
            id="name"
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-gray font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            type="password"
            id="password"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-gray font-bold mb-2" htmlFor="grade">
            Grade Level
          </label>
          <select
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            id="grade"
          >
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
            <option>Grade 4</option>
            <option>Grade 5</option>
            <option>Grade 6</option>
          </select>
        </div>

        <button
          className="bg-sunflower-yellow text-navy-blue font-bold py-2 px-4 rounded-lg w-full hover:bg-yellow-600 transition duration-200"
          type="submit"
        >
          Submit
        </button>
      </form>

    </div>
  )
}

export default page