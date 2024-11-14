"use client";

import baseUrl from "@/utils/baseUrl";
import React, { useEffect, useState } from "react";
import { Teacher } from "@/types/types";
import ReportForm from "@/components/Teacher/ReportForm";

function Dashboard() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateReportForm, setShowCreateReportForm] =
    useState<boolean>(false); // State to toggle the form visibility

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem("teacherToken");

        const response = await fetch(`${baseUrl}/teachers/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setTeacher(data);
      } catch (e) {
        console.log("Fetch error:", e);
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  const toggleCreateReportForm = () => {
    setShowCreateReportForm(!showCreateReportForm); // Toggle the form visibility
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!teacher) {
    console.warn("Teacher data not found:", teacher); // Log teacher state
    return <div className="text-center text-red-500">Teacher not found</div>;
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Hello, {teacher.name}!
        </h1>
        <p className="text-gray-600">Welcome back to your dashboard</p>
      </div>

      {/* Teacher Info Section */}
      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Your Information
        </h2>
        <div className="flex items-center space-x-4 mt-2">
          <div>
            <p className="text-gray-600">
              <strong>Email:</strong> {teacher.email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {teacher.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Subjects Section */}
      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Subjects You Teach
        </h2>
        {teacher.subjects && teacher.subjects.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            {teacher.subjects.map((subject, index) => (
              <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-800">
                  {subject.name}
                </h3>
                <p className="text-gray-600">
                  <strong>Grade:</strong> {subject.grade}
                </p>
                <p className="text-gray-600">
                  <strong>Students Enrolled:</strong>{" "}
                  {subject.students ? subject.students.length : 0}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No subjects assigned yet.</p>
        )}
      </div>

      {/* Button to Toggle Create Report Form */}
      <div className="text-center mt-6">
        <button
          onClick={toggleCreateReportForm}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {showCreateReportForm
            ? "Cancel Report Creation"
            : "Create New Report"}
        </button>
      </div>

      {/* Conditionally Render CreateReportForm */}
      {showCreateReportForm && <ReportForm />}
    </div>
  );
}

export default Dashboard;
