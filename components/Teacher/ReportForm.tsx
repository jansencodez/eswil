import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import baseUrl from "@/utils/baseUrl";
import { Teacher } from "@/types/types";

const ReportForm: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [reportId, setReportId] = useState<string | undefined>();
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`${baseUrl}/teachers`);
        const data = await response.json();
        setTeachers(data);
      } catch (err) {
        setError("Failed to load teachers.");
        console.log(err);
      }
    };

    fetchTeachers();
  }, []);

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      setError("Please enter a report title or ID to search.");
      return;
    }

    try {
      setIsLoading(true);
      const params = new URLSearchParams({ query: searchQuery });
      const url = `${baseUrl}/reports/search?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.message || "Unknown error occurred"}`);
        return;
      }

      const data = await response.json();

      if (data && data._id) {
        setReportId(data._id);
        setError("");
        setTitle(data.title || "");
        setDescription(data.description || "");
      } else {
        setError("Report not found.");
      }
    } catch (err) {
      setError("Error searching for the report.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !assignedTo) {
      setError("Title and assigned teacher are required.");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("teacherToken");
    const requestData = { title, description, assignedTo };
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = reportId
        ? await fetch(`${baseUrl}/reports/${reportId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(requestData),
          })
        : await fetch(`${baseUrl}/reports/create`, {
            method: "POST",
            headers,
            body: JSON.stringify(requestData),
          });

      if (!response.ok) {
        throw new Error("Error saving report.");
      }

      setSuccessMessage(
        reportId
          ? "Report updated successfully."
          : "Report created successfully."
      );
      setTitle("");
      setDescription("");
      setAssignedTo("");
      setReportId(undefined);
      setSearchQuery("");
      router.push("/reports");
    } catch (err) {
      setError("Error saving report.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {reportId ? "Edit Report" : "Create Report"}
      </h2>

      <form onSubmit={handleSearchSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Search Report
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter report title or ID"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {successMessage && (
        <div className="text-green-600 mb-4">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Assigned Teacher
          </label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading
            ? "Saving..."
            : reportId
            ? "Update Report"
            : "Create Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
