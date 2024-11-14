"use client";

import { useEffect, useState } from "react";
import { Student } from "@/types/types"; // Import TypeScript interface for Student
import { useRouter } from "next/navigation";
import baseUrl from "@/utils/baseUrl";

const Dashboard = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        if (!token) {
          router.push("/student/login"); // Redirect to login if no token
          return;
        }

        const response = await fetch(`${baseUrl}/students/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();

        // Convert fee_amount to a string if it's Decimal128 (MongoDB type)
        if (
          data.fee_amount &&
          typeof data.fee_amount === "object" &&
          data.fee_amount.$numberDecimal
        ) {
          data.fee_amount = data.fee_amount.$numberDecimal.toString(); // Convert to string
        }

        setStudent(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [router]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!student) {
    return <div className="text-center text-red-500">Student not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome, {student.name}: {student.studentId}
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("studentToken");
            router.push("/student/login");
          }}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Information
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Student ID:</strong> {student.studentId}
            </p>
            <p>
              <strong>Email:</strong> {student.email}
            </p>
            <p>
              <strong>Phone:</strong> {student.phone}
            </p>
            <p>
              <strong>Address:</strong> {student.address}
            </p>
          </div>
        </div>

        {/* Fee Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Fee Details
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Fee Amount:</strong> Ksh {student.fee_amount}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {student.fee_due_date || "Not Available"}
            </p>
          </div>
        </div>

        {/* Guardian Section */}
        {student.guardian && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Guardian Information
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Guardian Name:</strong> {student.guardian.name}
              </p>
              <p>
                <strong>Guardian Email:</strong> {student.guardian.email}
              </p>
              <p>
                <strong>Guardian Phone:</strong> {student.guardian.phone}
              </p>
            </div>
          </div>
        )}

        {/* Subjects Section */}
        {student.subjects && student.subjects.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 sm:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Subjects
            </h2>
            <div className="space-y-2">
              {student.subjects.map((subject) => (
                <p key={subject._id}>
                  <strong>{subject.name}</strong>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8">
        <button className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition mr-4">
          View Grades
        </button>
        <button className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
