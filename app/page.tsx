
import Link from 'next/link';
import React from 'react';
import ImageGallery from './components/ImageGallery';
import NewsItem from './components/NewsItem';
import image1 from "./assets/images/IMG-20241009-WA0046.jpg";
import image2 from "./assets/images/IMG-20241009-WA0051.jpg";
import image3 from "./assets/images/IMG-20241009-WA0053.jpg";
import image4 from "./assets/images/IMG-20241009-WA0052.jpg";
import image5 from "./assets/images/IMG-20241009-WA0016.jpg";

function page() {
  const imageSet1=[image1, image2];
  const imageSey2=[image3,image4,image5];

  return (
    <div>
      <main className=" bg-pink-50 flex flex-1 relative flex-col min-h-screen mx-1 mt-4">

        <section className='flex flex-row justify-center items-center bg-gray-300 justify-self-center w-full overflow-hidden whitespace-nowrap'>
          <p className='flex max-w-100 animate-scrollLeft text-clip'>
            There are no announcements right now.
            </p>
        </section>
        
        <section className='flex flex-col justify-center items-center m-0 shadow-lg my-4 bg-slate-300 p-3'>
          <p className='text-start z-0'>
            Welcome to <strong>Eswil Preparatory School</strong>, the best place for your child&apos;s academic growth.
          </p>
          <hr style={{width: '100%', height: 2, backgroundColor:"black"}}/>
          <p>
            <strong>Nothing but the best</strong>
          </p>
        </section>

        <section className='flex flex-wrap flex-col md:flex-row lg:flex-row justify-evenly p-6 items-center m-2 border border-spacing-3 border-y-black '>
          <div className='card-btn'>
          <Link href="./pages/admissions">Join us<i className="fa-solid fa-users"></i></Link>
          </div>
          <div className='card-btn'>learn more<i className='fa-solid fa-arrow-right'></i></div>
          <div className='card-btn'>contact us<i className='fa-solid fa-phone'></i></div>
          <div className='card-btn'>Our Teachers<i className='fa-solid fa-clipboard-user'></i></div>
        </section>
        <ImageGallery images={imageSet1}/>
        <section className='card'>
          <h2 className='hea'><strong>About Us</strong></h2>
          <p>
            We are set to help your children achieve greatness in their academia.
            We have a flexible sytem geared towards growing innovative and excellent minds. Our guided learning experience promots holistic development amongst the young minds.
          </p>
          <section className='card'>
            <h2>Welcome</h2>
            <p>
              <strong>Director&apos;s welcome note:</strong><br/>
              [The note]
            </p>
          </section>
        </section>
        
        {/*<ImageGallery/>*/}
        <section className='card'>
          <h2><strong>Our programmes</strong></h2>
          <p>Our programmes are a best suite for your child. We offer a comprehensive curriculum that is up to date and in synchrinization with the new CBC programme.</p>
        </section>
        <section className='card bg-gray-200'>
          <h2><strong>We are not limited to study programmes</strong></h2>
          <p>Our students engage in physical sports and self building activities</p>
          <ImageGallery images={imageSey2}/>
          <br/>
          <hr style={{width: '100%', height: 2, backgroundColor:"black"}}/>
          <h2>Clubs</h2>
          <p>Our students free to join clubs specific to their interests and passions. below are some clubs available</p>
          <hr style={{width: '100%', height: 2, backgroundColor:"black"}}/>
          <section>
            <table>
              <thead>
                <tr>
                  <th>Club</th>
                  <th>Activities</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Scouting</td>
                  <td>Scouting activities</td>
                </tr>
                <tr>
                  <td>Evironment</td>
                  <td>Environment activities</td>
                </tr>
                <tr>
                  <td>Music</td>
                  <td>Music activities</td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
        
        <section className='m-2 inset-3 shadow-inner border border-e-4 border-s-4 pt-2'>
          <h2><strong>News & Events</strong></h2>
          <NewsItem/>
        </section>
        
        <section className='card'>
          <h2><strong>Meet Our Teachers</strong></h2>
          <section>
            <p>[teachers]</p>
          </section>
        </section>
      </main>
      <footer className='sticky bg-slate-950 text-white flex flex-col mt-5 pt-8 pb-8 pr-2 pl-2 justify-start items-center' >
        <section className='flex flex-col md:flex-row lg:flex-row'>
          <section>
            <p><strong>Links</strong></p>
            <p><Link href="">facebook</Link></p>
          </section>
          <section>
            <p>
              <strong>Email us: </strong>
              <Link href="">[email]</Link>
            </p>
          </section>
          <hr className='md:hidden bg-white lg:hidden'/>
          <section>
            <p>
              <strong>Call: </strong>
                [number]
            </p>
          </section>
        </section>
        <section>
          <p>&copy;copyright</p>
        </section>
      </footer>
    </div>
  )
}

export default page