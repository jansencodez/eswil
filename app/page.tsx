'use client';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import ImageGallery from './components/ImageGallery';
import NewsItem from './components/NewsItem';
import image1 from './assets/images/IMG-20241009-WA0046.jpg';
import image2 from './assets/images/IMG-20241009-WA0051.jpg';
import image3 from './assets/images/IMG-20241009-WA0053.jpg';
import image4 from './assets/images/IMG-20241009-WA0052.jpg';
import image5 from './assets/images/IMG-20241009-WA0016.jpg';

const Page: React.FC = () => {
  const imageSet1: StaticImageData[] = [image1, image2];
  const imageSet2: StaticImageData[] = [image3, image4, image5];

  return (
    <div>
      <main className="bg-pink-50 flex flex-1 relative flex-col min-h-screen mx-1 mt-4">
        <section className="flex flex-row justify-center items-center bg-gray-300 justify-self-center w-full overflow-hidden whitespace-nowrap">
          <p className="flex max-w-100 animate-scrollLeft text-clip">
            There are no announcements right now.
          </p>
        </section>

        <section className="flex flex-col justify-center m-0 shadow-lg my-4 bg-slate-300 p-3">
          <p className="text-start z-0">
            Welcome to <strong>Eswil Preparatory School</strong>, the best place for your child&apos;s academic growth.
          </p>
          <hr style={{ width: '100%', height: 2, backgroundColor: 'black' }} />
          <p>
            Motto: <strong>Nurturing Minds, Shaping Bright Futures</strong>
          </p>
          <hr style={{ width: '100%', height: 2, backgroundColor: 'black' }} />
          <p>
            Mission: <strong>To Inpire students in achieving their academic potential, nurturing talents and preparing them for the visionary global opportunities</strong>
          </p>
          <hr style={{ width: '100%', height: 2, backgroundColor: 'black' }} />
          <p>
            Vision: <strong>To provide opportunity to all students in developing their full potential in academia and upscore their abilities and talents in a way that builds confidence and enables them live their lives to its fullness</strong>
          </p>
          <hr style={{ width: '100%', height: 2, backgroundColor: 'black' }} />
          <dl>
            <dt>Core Values&#40;RICATEG&#41;</dt>
            <dd>Respect</dd>
            <dd>Integrity</dd>
            <dd>Compation</dd>
            <dd>Accountability</dd>
            <dd>Teamwork</dd>
            <dd>Excellence</dd>
            <dd>Gratitute</dd>
          </dl>
        </section>

        <section className="flex flex-wrap flex-col md:flex-row lg:flex-row justify-evenly p-6 items-center m-2 border border-spacing-3 border-y-black">
          <div className="card-btn">
            <Link href="./pages/admissions">
              Join us <i className="fa-solid fa-users"></i>
            </Link>
          </div>
          <div className="card-btn">
            Learn more <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="card-btn">
            Contact us <i className="fa-solid fa-phone"></i>
          </div>
          <div className="card-btn">
            Our Teachers <i className="fa-solid fa-clipboard-user"></i>
          </div>
        </section>

        <ImageGallery images={imageSet1} />

        <section className="card">
          <h2 className="hea">
            <strong>About Us</strong>
          </h2>
          <p>
            The Eswil Preparatory School &#40;PEPS&#41; is located along Mumias-Busia Road, at Munami Market &#40;Kakamega/Busia county border&#41;
          </p>
          <p>
            TEPS follows Competency-Based Curriculum &#40;CBC&#41; which prepares learners with relevant skills and knowledge that assures them a prosperous in their academic journey through an engaging platform. 
          </p>
          <p>
            We are one of the leading schools and our Teachers are flexible and have close contact with your child at all time in school and through you at home. Our studying platform offers an environment where learners, teachers and parents interact for better building of the learner.
          </p>
          <p>
            We are set to help your children achieve greatness in their academia on an affordable system. We have a flexible system geared towards growing innovative and excellent minds. Our guided learning experience promotes holistic development amongst the young minds.<Link href="./pages/learn-more" className='text-cyan-600 underline underline-offset-1'>Learn more...</Link>
          </p>
          <section className="card">
            <h2>Welcome</h2>
            <p>
              <strong>Director&apos;s welcome note:</strong>
              <br />
              [The note]
            </p>
          </section>
        </section>

        <section className="card">
          <h2>
            <strong>Our Approach to Curriculum Delivery</strong>
          </h2>
          <p>
            TEPS has implemented and adapted to the <strong>Competency-Based Curriculum&#40;CBC&#41;</strong>. The school has seamlessly integrated the system principles into its teaching methodologies.
          </p>
          <p>
            Our teachers are well equiped with knowledge and skill of high proficiency level for effective delivery in in-class and out of class activities. The school is dedicated to quality education exemplified by the school&apos;s tailored approach to progressively develop each learner&apos;s ability to achieve full potential.
          </p>
          <p>
            TEPS is fortunate to adopt blended learning with inclusion of technology in learning promoting teamwork in research activities and critical thinking.
          </p>
          <p>
            There&apos;s a reach environment for teacher-student interaction type of study, clinging every student on a potential path. Our classes are split as below:
          </p>
          <table>
            <thead>
              <tr>
                <th>Group</th>
                <th>Classes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ECDE</td>
                <td>Play Group&#40;PP1 & PP2&#41;</td>
              </tr>
              <tr>
                <td>Lower Primary</td>
                <td>Grade 1 - Grade 3</td>
              </tr>
              <tr>
                <td>Upper Primary</td>
                <td>Grade 4 - Grade 6</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="card bg-gray-200">
          <h2>
            <strong>We Are Not Limited to Study Programmes</strong>
          </h2>
          <section>
            <h3><b><em>Pastoral Care:</em></b></h3>
            <p>
              We understand the importance of a supportive and nurturing environment for a child&apos;s development. Our pastoral care programme ensures every the well-being of every learner, fostering a safe and inclusive community.
            </p>
          </section>
          <section>
            <h3><b><em>Holistic Support:</em></b></h3>
            <p>
              We provide emotional and social support through counselling, mentorship and individualized care.
            </p>
          </section>
          <section>
            <b><em>Positive School Culture</em></b>
            <p>
              We cultivate a positive and respectful school environment where every student feels valued and cared for.
            </p>
          </section>
          <section>
            <b><em>Health and safety</em></b>
            <p>
              The health and safety of of our learners is at top priority. we do have standards and proactive programs to handle states that may threaten student&apos;s lives.
            </p>
          </section>
          <ImageGallery images={imageSet2} />
          <br />
          <hr style={{ width: '100%', height: 2, backgroundColor: 'black' }} />
          <section>
            <b><em>Extracurricular Activities</em></b>
            <p>
              we recognize that each learner has a unique set of talent and ability that need nurturing and growth. Some of our enriched programmes are music, drama and scouting. In 2025, we are introducing more beyond the classroom setup including journalism and 4k - club, we want to ensure that talents are nartured as early as now
            </p>
            
            <section>
              <h3><em>Clubs</em></h3>
              <p>
                Some active clubs include;
              </p>
              <hr style={{ width: '100%', height: 2, backgroundColor: 'black' }} />
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
                    <td>Drama</td>
                    <td>Drama and acting activities</td>
                  </tr>
                  <tr>
                    <td>Music</td>
                    <td>Music activities</td>
                  </tr>
                  <tr>
                    <td>Sports</td>
                    <td>Sporting activities</td>
                  </tr>

                  <tr>
                    <td>Debate</td>
                    <td>Debating Activities</td>
                  </tr>
                  
                  <tr>
                    <td>Dance</td>
                    <td>Dance Activities</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h3><em>Sports & Physical Education/Activities</em></h3>
              <p>
                Our sports program promotes physical fitness, team work and a healthy lifestyle through a vast selection on which sport and/or physical activity a learner in interested in.
              </p>
            </section>
              
            <section>
              <h3><em>STEM Activities</em></h3>
              <p>
                We offer a range of activities that encourage exploration in:
              </p>
              <ul>
                <li>Science</li>
                <li>Technology</li>
                <li>Engineering</li>
                <li>Mathematics</li>
              </ul>
              <p>This is to grow innavative and problem solving minds</p>
            </section>
          </section>

          <section>
            <h3><em>Parental Involment</em></h3>
            <p>
              We value parent partnership and involvement in school matters.
            </p>
          </section>
          
          <section>
            <h3><em>Community Engagement</em></h3>
            <p>
              We believe in the power of the community and the importance of giving back. We actively involve learners in community service work. Our students engage in service projects that promote empathy, social responsibility and community awareness.
            </p>
          </section>

          <section>
            <h3><em>Local Partnership</em></h3>
            <p>
              Collaboration with local businesses and organizations has greatly enhanced and supported our educational programmes.
            </p>
          </section>

          <section>
            <h3><em>Cultural Celebrations</em></h3>
            <p>
              We celebrate cultural diversity and inclusivity through events and axtivities that reflect the rich cultural tapestry of our community.
            </p>
          </section>

        </section>

        <section className="m-2 inset-3 shadow-inner border border-e-4 border-s-4 pt-2">
          <h2>
            <strong>News & Events</strong>
          </h2>
          <NewsItem />
        </section>

        <section className="card">
          <h2>
            <strong>Meet Our Teachers</strong>
          </h2>
          <section>
            <p>[teachers]</p>
          </section>
        </section>
      </main>

      <footer className="sticky bg-slate-950 text-white flex flex-col mt-5 pt-8 pb-8 pr-2 pl-2 justify-start items-center">
        <section className="flex flex-col md:flex-row lg:flex-row">
          <section>
            <p>
              <strong>Links</strong>
            </p>
            <p>
              <Link href="#">Facebook</Link>
            </p>
          </section>
          <section>
            <p>
              <strong>Email us: </strong>
              <Link href="#">[email]</Link>
            </p>
          </section>
          <hr className="md:hidden bg-white lg:hidden" />
          <section>
            <p>
              <strong>Call: </strong>
              [number]
            </p>
          </section>
        </section>
        <section>
          <p>&copy; Copyright 2024</p>
        </section>
      </footer>
    </div>
  );
};

export default Page;
