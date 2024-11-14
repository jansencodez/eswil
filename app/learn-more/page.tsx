import Image from "next/image";
import React from "react";
import classroomPic from "../../assets/freepik/125.jpg";
import musicImage from "../../assets/freepik/zcm5_0r24_220118.jpg";
import sportsImage from "../../assets/freepik/28267.jpg";
import stemImage from "../../assets/freepik/t60r_66ml_210519.jpg";
function LearnMore() {
  return (
    <div className="bg-gray-100 p-3">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">About Us</h1>
        <p className="text-lg text-gray-700">
          The Eswil Preparatory School (TEPS) is located along Mumias-Busia Road
          at Munami Market, on the Kakamega/Busia County border. We follow a
          Competency-Based Curriculum (CBC) that equips learners with practical
          skills and knowledge for success in an ever-changing world.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-3xl font-semibold text-pink-600 mb-4">
          Our Approach to Curriculum
        </h2>
        <p className="text-gray-700">
          TEPS integrates CBC principles, encouraging critical thinking,
          problem-solving, and real-world applications. Our teachers, through
          continuous professional development, deliver personalized instruction,
          supporting each learner’s journey.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-2xl font-semibold text-pink-600">
              Grade Levels Offered
            </h3>
            <ul className="list-disc ml-6 mt-2 text-gray-700">
              <li>ECDE (Play group, PP1, PP2)</li>
              <li>Lower Primary (Grade 1 - Grade 3)</li>
              <li>Upper Primary (Grade 4 - Grade 6)</li>
            </ul>
          </div>
          <figure className="flex flex-col items-center justify-center">
            <Image
              src={classroomPic}
              alt="Classroom"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
            <figcaption className="text-xs text-gray-400 mt-2 text-center">
              <a href="https:www.freepik.com">Image sourced from Freepik</a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-gray-50 rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-3xl font-semibold text-pink-600 mb-4">
          Pastoral Care
        </h2>
        <p className="text-gray-700">
          Our pastoral care program ensures each learner’s well-being, creating
          a safe and supportive community.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-2xl font-semibold text-pink-500">
              Holistic Support
            </h3>
            <p className="text-gray-700">
              We provide social, emotional, and academic support through
              counseling, mentorship, and individualized care.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-pink-500">
              Health & Safety
            </h3>
            <p className="text-gray-700">
              Maintaining rigorous health and safety standards is our top
              priority to ensure a secure environment for all.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-3xl font-semibold text-pink-600 mb-4">
          Extracurricular Activities
        </h2>
        <p className="text-gray-700">
          At TEPS, we encourage students to explore their unique talents beyond
          the classroom. Enrichment programs include music, drama, and scouting,
          with upcoming initiatives like journalism and 4K club in 2025.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <figure className="flex flex-col items-center justify-center">
            <Image
              src={musicImage}
              alt="Music Activity"
              width={300}
              height={200}
              className="rounded-lg shadow-md"
            />
            <figcaption className="text-xs text-gray-400 mt-2 text-center">
              <a href="https:www.freepik.com">Image sourced from Freepik</a>
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center justify-center">
            <Image
              src={sportsImage}
              alt="Sports Activity"
              width={300}
              height={200}
              className="rounded-lg shadow-md"
            />
            <figcaption className="text-xs text-gray-400 mt-2 text-center">
              <a href="https:www.freepik.com">Image sourced from Freepik</a>
            </figcaption>
          </figure>
          <figure className="flex flex-col items-center justify-center">
            <Image
              src={stemImage}
              alt="STEM Activity"
              width={300}
              height={200}
              className="rounded-lg shadow-md"
            />
            <figcaption className="text-xs text-gray-400 mt-2 text-center">
              <a href="https:www.freepik.com">Image sourced from Freepik</a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-gray-50 rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">
          Community Engagement
        </h2>
        <p className="text-gray-700">
          TEPS believes in the power of community and giving back. Our students
          are involved in various service projects and cultural celebrations,
          fostering empathy and awareness of societal needs.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-700">
          To empower students to reach their full potential, build confidence,
          and live fulfilling lives.
        </p>
      </section>

      <section className="bg-gray-50 rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700">
          To inspire students to excel academically, nurture their unique
          talents, and prepare them for global opportunities.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">
          Core Values
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            <strong>Respect</strong>: Fostering mutual respect in our community
          </li>
          <li>
            <strong>Integrity</strong>: Upholding honesty and transparency
          </li>
          <li>
            <strong>Compassion</strong>: Creating a nurturing environment
          </li>
          <li>
            <strong>Accountability</strong>: Emphasizing responsibility in
            learning and actions
          </li>
          <li>
            <strong>Teamwork</strong>: Valuing collaboration among students,
            staff, and community
          </li>
          <li>
            <strong>Excellence</strong>: Striving for high standards in
            academics and personal growth
          </li>
          <li>
            <strong>Gratitude</strong>: Appreciating opportunities and
            relationships
          </li>
        </ul>
      </section>
    </div>
  );
}

export default LearnMore;
