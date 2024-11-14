import React, { useState, useEffect } from "react";
import AdminForm from "./AdminStudentRegistration";
import baseUrl from "../../utils/baseUrl";

interface Student {
  _id: string;
  studentId: string;
  name: string;
  age: number;
  grade: string;
  enrollmentDate: string;
  fee_amount: number | { $numberDecimal: string }; // Adjust the type for fee_amount
}

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudentId, setNewStudentId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggler, setToggler] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true); // Start loading

      try {
        const response = await fetch(`${baseUrl}/students`);
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();

        // Check if the data is in the expected format
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err: unknown) {
        console.log(err);
        setError("Failed to load student data. Please try again later.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchStudents();
  }, []); // Dependency array ensures the effect runs only once

  const handleDeleteClick = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (isConfirmed) {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/students/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete student");
        }

        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== id)
        );
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full text-black">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Students</h2>

      {/* Display error message if there's an error */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Student ID input for editing */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Enter Student ID</label>
        <input
          type="text"
          className="block w-full border border-gray-300 p-2 rounded-md"
          value={newStudentId}
          onChange={(e) => {
            setNewStudentId(e.target.value);
          }}
          placeholder="Enter Student ID to Edit"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setToggler(!toggler);
          }}
          className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {!toggler && <i className="fa-solid fa-edit"></i>}
          {toggler && <i className="fa-solid fa-x"></i>}
        </button>
      </div>

      {/* Admin Form for adding or editing students */}
      {toggler &&
        (newStudentId ? (
          <AdminForm studentId={newStudentId} />
        ) : (
          <AdminForm studentId="" />
        ))}

      {/* Students List */}
      <div className="bg-gray-50 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold text-gray-700 p-4">
          All Students
        </h3>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <th className="py-2 px-4">StudentID</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Age</th>
                  <th className="py-2 px-4">Grade</th>
                  <th className="py-2 px-4">Enrollment Date</th>
                  <th className="py-2 px-4">Fee Paid</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {students.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="py-2 px-4">{student.studentId}</td>
                    <td className="py-2 px-4">{student.name}</td>
                    <td className="py-2 px-4">{student.age}</td>
                    <td className="py-2 px-4">{student.grade}</td>
                    <td className="py-2 px-4">
                      {student.enrollmentDate
                        ? new Date(student.enrollmentDate).toLocaleDateString(
                            "en-US"
                          )
                        : ""}
                    </td>
                    <td className="py-2 px-4">
                      {typeof student.fee_amount === "object" &&
                      student.fee_amount !== null
                        ? student.fee_amount.$numberDecimal // Extract the string value from the object
                        : student.fee_amount}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDeleteClick(student._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
