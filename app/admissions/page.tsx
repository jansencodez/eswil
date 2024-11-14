"use client";

import baseUrl from "@/utils/baseUrl";
import React, { useState } from "react";
import useAlert from "@/hooks/useAlert";
import RegistrationSuccess from "@/components/Student/RegistrationSuccess";

const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    grade: "Choose grade level",
    fee_amount: "0", // Changed to string
    enrollmentDate: "",
    age: "", // Optional field
    parentName: "",
    phoneNumber: "",
    parentEmail: "", // Optional
    relationship: "parent",
  });
  const [studentInfo, setStudentInfo] = useState<{
    name: string;
    studentId: string;
  } | null>(null);
  const { Alert, showAlert } = useAlert();
  const handleBlur = () => {
    if (
      formData.phoneNumber.startsWith("07") ||
      formData.phoneNumber.startsWith("01")
    ) {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: "+254" + prev.phoneNumber.slice(1),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const guardian = {
      name: formData.parentName,
      relationship: formData.relationship,
      email: formData.parentEmail,
      phone: formData.phoneNumber,
    };

    const requestData = {
      name: formData.name,
      grade: formData.grade,
      fee_amount: formData.fee_amount,
      enrollmentDate: formData.enrollmentDate,
      guardian: guardian,
      age: formData.age,
    };

    console.log(requestData);

    try {
      const response = await fetch(`${baseUrl}/students/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        console.log(requestData);
        const errorData = await response.json();
        console.log("Error:", errorData);
        throw new Error(errorData.message || "Failed to add or update student");
      }

      const responseData = await response.json();
      showAlert("Successfully registered");
      setStudentInfo({
        name: responseData.name,
        studentId: responseData.studentId,
      });
      setFormData({
        name: "",
        grade: "Choose grade level",
        fee_amount: "0", // Changed to string
        enrollmentDate: "",
        age: "", // Optional field
        parentName: "",
        phoneNumber: "",
        parentEmail: "", //optional
        relationship: "parent",
      });
    } catch (err) {
      console.log("Submission error:", err);
      showAlert("An unexpected error occurred.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "fee_amount" || name === "age"
          ? value.toString() // Ensure fee_amount and age are strings
          : value,
    }));
  };

  if (studentInfo) {
    return (
      <RegistrationSuccess
        name={studentInfo.name}
        studentId={studentInfo.studentId}
      />
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-off-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-navy-blue">
          Student Registration
        </h2>

        {/* Student Details Section */}
        <fieldset className="border border-black rounded-xl p-3">
          <legend className="font-bold text-gray-400 text-xl">
            Student Details:
          </legend>

          {/* Full Name */}
          <div className="mb-4">
            <label
              className="block text-slate-gray font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label
              className="block text-slate-gray font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
              type="text"
              id="age"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              placeholder="Enter age"
            />
          </div>

          {/* Grade Level */}
          <div className="mb-4">
            <label
              className="block text-slate-gray font-bold mb-2"
              htmlFor="grade"
            >
              Grade Level
            </label>
            <select
              className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
              id="grade"
              name="grade"
              value={formData.grade || ""}
              onChange={handleChange}
            >
              <option>Choose grade level</option>
              <option>PP1</option>
              <option>PP2</option>
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>Grade 3</option>
              <option>Grade 4</option>
              <option>Grade 5</option>
              <option>Grade 6</option>
            </select>
          </div>

          {/* Fee Amount */}
          <div className="mb-4">
            <label
              className="block text-slate-gray font-bold mb-2"
              htmlFor="fee_amount"
            >
              Enter Fee Amount
            </label>
            <input
              className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
              type="number"
              id="fee_amount"
              name="fee_amount"
              value={formData.fee_amount || ""}
              onChange={handleChange}
              placeholder="Enter fee paid"
            />
          </div>

          {/* Date of Registration */}
          <div className="mb-4">
            <label
              className="block text-slate-gray font-bold mb-2"
              htmlFor="enrollmentDate"
            >
              Date of Registration
            </label>
            <input
              className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
              type="date"
              id="enrollmentDate"
              name="enrollmentDate"
              value={formData.enrollmentDate || ""}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Parent/Guardian Details Section */}
        <fieldset className="border border-black rounded-xl p-3 mb-2">
          <legend className="font-bold text-gray-400 text-xl">
            Parent/Guardian Details:
          </legend>

          {/* Parent Full Name */}
          <div className="mb-4">
            <label
              className="block text-slate-gray font-bold mb-2"
              htmlFor="parentName"
            >
              Parent/Guardian Full Name
            </label>
            <input
              className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName || ""}
              onChange={handleChange}
              placeholder="Enter parent/guardian full name"
            />
          </div>

          {/* Relationship */}
          <label
            className="block text-slate-gray font-bold mb-2"
            htmlFor="relationship"
          >
            Relationship
          </label>
          <select
            className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
            name="relationship"
            id="relationship"
            value={formData.relationship || ""}
            onChange={handleChange}
          >
            <option>parent</option>
            <option>guardian</option>
          </select>

          {/* Phone Number */}
          <div className="mb-4">
            <label
              className="block text-slate-gray font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter parent/guardian phone number"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-slate-gray font-bold mb-2"
              htmlFor="parentEmail"
            >
              Email
            </label>
            <input
              className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
              type="email"
              id="parentEmail"
              name="parentEmail"
              value={formData.parentEmail || ""}
              onChange={handleChange}
              placeholder="Enter parent/guardian email"
            />
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-yellow-500 text-black font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-light-blue"
        >
          Submit
        </button>
      </form>
      <Alert />
    </div>
  );
};

export default Page;
