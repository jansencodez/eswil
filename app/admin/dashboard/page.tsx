// dashboard/Dashboard.tsx
"use client";
import { useState } from "react";
import CreateAdmin from "../../../components/Admin/CreateAdmin";
import DefaultDashboardContent from "../../../components/Admin/DefaultDashboard";
import Reports from "../../../components/Admin/Reports";
import Students from "../../../components/Admin/Students";
import Teachers from "../../../components/Admin/Teachers";
import Updates from "../../../components/Admin/Updates";
import UpdatesView from "../../../components/Admin/UpdatesView";
import Layout from "../../../components/Admin/DashboardLayout"; // Import the Layout component

function Dashboard() {
  const [currentContent, setCurrentContent] = useState("");
  // State to track which content is being displayed

  // Render the content based on the current state
  const renderContent = () => {
    switch (currentContent) {
      case "updates":
        return <Updates />;
      case "add-admin":
        return <CreateAdmin />;
      case "updates-view":
        return <UpdatesView />;
      case "students":
        return <Students />;
      case "teachers":
        return <Teachers />;
      case "reports":
        return <Reports />;
      case "settings":
        return <div>Settings content goes here.</div>;
      case "default":
        return <DefaultDashboardContent />;
      default:
        return <DefaultDashboardContent />;
    }
  };

  return (
    <Layout setCurrentContent={setCurrentContent}>{renderContent()}</Layout>
  );
}

export default Dashboard;
