"use client";

import React, { FormEvent, useState } from "react";
import LoginForm from "@/components/Common/LoginForm";
import useAlert from "@/hooks/useAlert";
import baseUrl from "@/utils/baseUrl";
import { useRouter } from "next/navigation";

const StudentLogin = () => {
  const { Alert, showAlert } = useAlert();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    // Validate the required fields (name and studentId)
    if (!name || !studentId) {
      setError("Please enter both name and student ID.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/students/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, studentId }),
      });

      const data = await response.json();

      // If the login is successful (status code 200), save token and redirect
      if (response.ok) {
        localStorage.setItem("studentToken", data.token); // Store the JWT token in localStorage
        showAlert("Login successful");

        // Redirect to the student's dashboard after storing the token
        setTimeout(() => {
          router.push("/student/dashboard");
        }, 500); // Delay the redirect for UX
      } else {
        // Handle errors in case of a failed login attempt
        setTimeout(() => {
          setError(""); // Clear the previous error message after a short delay
        }, 2000);

        // Set the error message from the response, or a generic error message
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err: unknown) {
      // Handle unexpected errors
      if (err instanceof Error) {
        showAlert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <LoginForm
        title="Student Login"
        error={error}
        onSubmit={handleLogin}
        additionalFields={
          <>
            <div className="mb-4">
              <label
                className="block text-slate-gray font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                required
                className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-slate-gray font-bold mb-2"
                htmlFor="studentId"
              >
                Student ID
              </label>
              <input
                required
                className="w-full p-3 border border-slate-gray rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-light-blue"
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter your student ID"
              />
            </div>
          </>
        }
      />
      <Alert />
    </>
  );
};

export default StudentLogin;
