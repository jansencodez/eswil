import baseUrl from "@/utils/baseUrl";
import React, { useEffect, useState } from "react";

interface Activity {
  description: string;
  date: string;
}

interface DashboardData {
  totalStudents: number;
  totalTeachers: number;
  recentActivity: Activity[];
}

const DefaultDashboardContent: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/admins/dashboard/summary`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log("Error data from backend:", errorData); // Log full response
          throw new Error(errorData.details);
        }

        const data = await response.json();
        setDashboardData(data); // Update dashboard data state
      } catch (error: unknown) {
        console.log("Failed to fetch summary data:", error);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error if any
  }

  if (!dashboardData) {
    return <div>Please check connection</div>; // Handle null data case
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-1 text-black">
      <h2 className="text-2xl font-bold text-white">
        Welcome to the Admin Dashboard!
      </h2>
      <p className="text-center text-gray-600">
        Use the buttons on the left to manage students, teachers, view reports,
        and configure settings.
      </p>

      <div className="flex flex-col gap-4 items-center w-full max-w-md">
        {/* Overview of Key Metrics */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md w-full text-center">
          <h3 className="font-semibold text-lg">
            Overview (view reports for details)
          </h3>
          <ul className="mt-2">
            <li>Total Students: {dashboardData.totalStudents}</li>
            <li>Total Teachers: {dashboardData.totalTeachers}</li>
          </ul>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md w-full text-center">
          <h3 className="font-semibold text-lg">Tips</h3>
          <p className="mt-2">
            Quickly access frequently used sections by selecting options on the
            left.
          </p>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md w-full text-center">
          <h3 className="font-semibold text-lg">Recent Activity</h3>
          <ul className="mt-2 text-sm">
            {dashboardData.recentActivity.map((activity, index) => (
              <li key={index}>
                {activity.description} on {activity.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboardContent;
