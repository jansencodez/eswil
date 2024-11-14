import baseUrl from "../../utils/baseUrl";
import useAlert from "../../hooks/useAlert";
import React, { useState } from "react";

export default function CreateAdmin() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const { Alert, showAlert } = useAlert();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !password || !role) {
      setError("All fields are required");
      return;
    }
    const adminToken = localStorage.getItem("adminToken");
    try {
      const response = await fetch(`${baseUrl}/admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`, // Add the AdminToken here
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.ok) {
        showAlert("Admin Created Successfully");
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        setError("");
      } else {
        const data = await response.json();
        setError(data.error || "An error occurred");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("An error occurred while creating the admin");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white text-black shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Create Admin</h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 text-black">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="admin">admin</option>
            <option value="superadmin">superadmin</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 text-black bg-yellow-600 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Admin
          </button>
        </div>
      </form>

      <Alert />
    </div>
  );
}
