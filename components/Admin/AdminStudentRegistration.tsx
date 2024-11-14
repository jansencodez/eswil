"use client";

import baseUrl from "../../utils/baseUrl";
import React, { useState, useEffect } from "react";
import useAlert from "../../hooks/useAlert";
type AdminFormProps = {
  studentId?: string; // studentId is optional, used for editing
};

const AdminForm: React.FC<AdminFormProps> = ({ studentId }) => {
  const [formData, setFormData] = useState({
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
  const { Alert, showAlert } = useAlert();
  const [loading, setLoading] = useState(true); // To show loading while fetching data

  // Fetch data if studentId exists (edit case)
  useEffect(() => {
    if (studentId) {
      const fetchStudentData = async () => {
        try {
          const response = await fetch(`${baseUrl}/students/${studentId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch student data");
          }

          const data = await response.json();

          // Ensure that guardian details exist before accessing them
          const guardian = data.guardian || {};
          console.log(data);
          if (data) {
            setFormData({
              name: data?.name,
              grade: data?.grade,
              fee_amount: data?.fee_amount, // Ensure fee_amount is a string
              enrollmentDate: data?.enrollmentDate
                ? new Date(data?.enrollmentDate).toISOString().slice(0, 10)
                : "", // Convert date format
              age: data?.age ? data?.age.toString() : "", // Ensure age is a string
              parentName: guardian?.name || "", // Check if guardian details exist
              parentEmail: guardian?.email || "",
              relationship: guardian?.relationship || "",
              phoneNumber: guardian?.phone || "",
            });
          }

          setLoading(false);
        } catch (err) {
          console.log(err); // Optional logging for debugging
          setLoading(false);
        }
      };

      fetchStudentData();
    } else {
      setLoading(false); // No need to load anything if it's a new student
    }
  }, [studentId]);

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

  const [formError, setFormError] = useState("");

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

    try {
      // Determine the URL and method (PUT for updating or POST for adding)
      const url = studentId
        ? `${baseUrl}/students?id=${studentId}` // If studentId exists, update the student
        : `${baseUrl}/students/enroll`; // Otherwise, create a new student
      const method = studentId ? "PUT" : "POST";

      // Make the API request
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          // Ensure content type is set correctly
        },
        body: JSON.stringify(requestData), // Send the request data as JSON
      });

      // Check if the response status is OK (status code 200-299)
      if (!response.ok) {
        // If the response is not OK, parse the response body to get the error details
        const errorData = await response.json();
        console.log("Error:", errorData); // Log the error for debugging
        throw new Error(errorData.message || "Failed to add or update student"); // Throw a custom error with the message
      }

      // Optionally, parse the response JSON if needed
      const responseData = await response.json();
      console.log("Success:", responseData);

      showAlert(
        studentId
          ? "Student data updated successfully!"
          : "New student added successfully!"
      );
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
      setFormError(""); // Clear any previous errors
    } catch (err) {
      console.log("Error", err);
    }
  };

  if (loading) return <p>Loading student data...</p>;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-off-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-navy-blue">
          {studentId ? "Edit Student Details" : "Add New Student"}
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
              placeholder="select date"
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
              htmlFor="parent-name"
            >
              Parent/Guardian Full Name
            </label>
            <input
              className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
              type="text"
              id="parent-name"
              name="parentName"
              value={formData.parentName || ""}
              onChange={handleChange}
              placeholder="Enter parent/guardian full name"
            />
          </div>
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
          <div className="mb-4">
            <label
              className="block text-slate-gray font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
              type="text"
              id="phone"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter parent/guardian phone number"
            />
          </div>
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

        {formError && <p className="text-red-500">{formError}</p>}
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded-xl shadow-lg"
        >
          {studentId ? "Update" : "Submit"}
        </button>
      </form>
      <Alert />
    </div>
  );
};

export default AdminForm;
