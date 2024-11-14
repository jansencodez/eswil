import baseUrl from "../../utils/baseUrl";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Define the types for the form data
interface Subject {
  subjectName: string;
  grade: string;
  students: string[]; // assuming students is an array of strings
}

interface TeacherFormData {
  name: string;
  email: string;
  phone: string;
  subjects: Subject[];
}

const TeacherForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  const [formData, setFormData] = useState<TeacherFormData>({
    name: "",
    email: "",
    phone: "",
    subjects: [{ subjectName: "", grade: "", students: [] }],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchTeacher = async () => {
        try {
          const response = await fetch(`${baseUrl}/teachers/${id}`);
          if (!response.ok) throw new Error("Failed to fetch teacher");
          const data = await response.json();
          setFormData({
            ...data,
            subjects: data.subjects || [
              { subjectName: "", grade: "", students: [] },
            ],
          });
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };
      fetchTeacher();
    } else {
      setLoading(false); // For adding new teacher
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Subject
  ) => {
    setFormData((prev) => {
      const updatedSubjects = [...prev.subjects];
      if (field === "students") {
        // Handling the "students" field as an array of strings
        updatedSubjects[index][field] = e.target.value
          .split(",")
          .map((student) => student.trim());
      } else if (field === "subjectName" || field === "grade") {
        // For "subjectName" and "grade", handle them as strings
        updatedSubjects[index][field] = e.target.value;
      }

      return { ...prev, subjects: updatedSubjects };
    });
  };

  const handleAddSubject = () => {
    setFormData((prev) => ({
      ...prev,
      subjects: [
        ...prev.subjects,
        { subjectName: "", grade: "", students: [] },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      // Update existing teacher
      try {
        const response = await fetch(`${baseUrl}/teachers/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to update teacher");
        alert("Teacher updated successfully!");
        router.push("/admin/teachers");
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert(`Error: ${err.message}`);
        } else {
          alert("Error updating teacher");
        }
      }
    } else {
      // Add new teacher
      try {
        const response = await fetch(`${baseUrl}/teachers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to add teacher");
        alert("Teacher added successfully!");
        router.push("/admin/teachers");
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert("Error adding teacher");
        }
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg text-black"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {id ? "Edit Teacher" : "Add Teacher"}
      </h2>

      {/* Teacher Name */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 font-semibold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Teacher Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Teacher Phone */}
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 font-semibold mb-2"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Subject Fields */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Subjects</h3>
        {formData.subjects.map((subject, index) => (
          <div key={index} className="mb-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor={`subjectName-${index}`}
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Subject Name
                </label>
                <input
                  type="text"
                  id={`subjectName-${index}`}
                  value={subject.subjectName}
                  onChange={(e) => handleChange(e, index, "subjectName")}
                  placeholder="Subject"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor={`grade-${index}`}
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Grade
                </label>
                <input
                  type="text"
                  id={`grade-${index}`}
                  value={subject.grade}
                  onChange={(e) => handleChange(e, index, "grade")}
                  placeholder="Grade"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              className="text-red-500 mt-2"
              onClick={() => {
                const updatedSubjects = formData.subjects.filter(
                  (_, i) => i !== index
                );
                setFormData({ ...formData, subjects: updatedSubjects });
              }}
            >
              Remove Subject
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSubject}
          className="text-blue-500 mt-4"
        >
          Add Subject
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
      >
        {id ? "Update Teacher" : "Add Teacher"}
      </button>
    </form>
  );
};

export default TeacherForm;
