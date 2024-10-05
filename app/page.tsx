import React from 'react';


function page() {
  return (
    <div>
      <main className=" bg-pink-50 flex flex-1 flex-col min-h-screen mt-24">
        <section className='flex flex-row justify-center items-center bg-gray-300 justify-self-center w-full overflow-hidden whitespace-nowrap'>
          <p className='flex max-w-100 animate-scrollLeft text-clip'>urgent textual announcements and events: random long text and even more</p>
        </section>
        <section className='m-5 rounded-xl shadow-lg my-8 bg-slate-300 flex p-3'>
        <p className='text-xl text-center z-0'> Welcome to <strong>Eswil Preparatory School</strong>, the best place for your child to get the best experience in education</p>
        </section>
        <section className='flex flex-wrap flex-row justify-evenly p-6 items-center m-5'>
          <div className='card'>Join us<i className="fa-solid fa-users"></i></div>
          <div className='card'>learn more<i className='fa-solid fa-arrow-right'></i></div>
          <div className='card'>contact us<i className='fa-solid fa-phone'></i></div>
          <div className='card'>Our Teachers<i className='fa-solid fa-clipboard-user'></i></div>
        </section>
        <section>
          <p>
            Founded in [date], Eswil Preparatory School has stood the test of time offering quality education and equiping leaners with modern skills 
          </p>
          <p>
            Our professional stuff nurture talents in different areas and help the young minds get on path to accomplish their goals
          </p>
        </section>
      </main>
    </div>
  )
}

export default page