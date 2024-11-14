import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigating to edit teacher
import baseUrl from "../../utils/baseUrl"; // Ensure this is set properly for your backend
import TeacherForm from "./TeacherForm";

type Student = {
  _id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
};

type Teacher = {
  _id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  hireDate: string;
  subjects: Array<{ subjectName: string; grade: string; students: Student[] }>; // Example for subjects
};

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [addTeacher, setAddTeacher] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Fetch teachers from the backend
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(`${baseUrl}/teachers`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token if necessary
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }

        const data = await response.json();
        setTeachers(data);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to load teachers");
        }
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []); // Empty array means it runs once when the component mounts

  // Edit teacher - Navigate to the edit form
  const handleEdit = (id: string) => {
    router.push(`/admin/teachers/edit/${id}`);
  };

  // Delete teacher - Call API to remove a teacher
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${baseUrl}/teachers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTeachers(teachers.filter((teacher) => teacher._id !== id));
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete teacher");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to delete teacher");
      }
    }
  };

  const handleAddNewTeacher = () => {
    setAddTeacher(true);
  };

  if (loading) return <p>Loading teachers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teacher Management</h2>

      <button
        onClick={handleAddNewTeacher}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
      >
        Add New Teacher
      </button>
      {addTeacher && <TeacherForm />}
      <div className="overflow-x-auto">
        {" "}
        {/* Make the table horizontally scrollable */}
        <table className="min-w-full table-auto text-black">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Subjects</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td className="px-4 py-2 border-b">{teacher.name}</td>
                <td className="px-4 py-2 border-b">
                  {teacher.subjects.map((subject, index) => (
                    <div key={index}>
                      <p>
                        {subject.subjectName} ({subject.grade})
                      </p>
                      <ul>
                        {subject.students.map((student) => (
                          <li key={student._id}>{student.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 border-b">{teacher.email}</td>
                <td className="px-4 py-2 border-b">{teacher.phone}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEdit(teacher._id)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher._id)}
                    className="text-red-500 ml-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
