"use client";

import baseUrl from "@/utils/baseUrl";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface LayoutProps {
  setCurrentContent: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ setCurrentContent, children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [adminName, setAdminName] = useState<string | null>(null);
  const router = useRouter();

  // Check for token and fetch admin data
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${baseUrl}/admins/dashboard/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log(response);
        }

        if (response.ok) {
          const data = await response.json();
          setAdminName(data.name);
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        console.log("Error fetching admin data:", error);
        router.push("/admin/login");
      }
    };

    fetchAdminData();
  }, [router]);

  const handlePopupToggle = () => setIsPopupOpen(!isPopupOpen);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/");
  };

  const DashboardButtons = () => (
    <>
      <button
        onClick={() => {
          setCurrentContent("default");
          setIsPopupOpen(false);
        }}
        className="text-white font-bold py-2 px-4 rounded-lg w-full bg-yellow-600 hover:bg-yellow-500 mb-2"
      >
        <i className="fa-solid fa-house"></i>
      </button>

      <button
        onClick={() => {
          setCurrentContent("updates-view");
          setIsPopupOpen(false);
        }}
        className="text-white font-bold py-2 px-4 rounded-lg w-full bg-yellow-600 hover:bg-yellow-500 mb-2"
      >
        <i className="fa fa-newspaper"></i> &amp;{" "}
        <i className="fa-solid fa-calendar-days"></i>
      </button>
      <button
        onClick={() => {
          setCurrentContent("updates");
          setIsPopupOpen(false);
        }}
        className="text-white font-bold py-2 px-4 rounded-lg w-full bg-yellow-600 hover:bg-yellow-500 mb-2"
      >
        Updates <i className="fa-solid fa-pen-nib"></i>
      </button>
      <button
        onClick={() => {
          setCurrentContent("students");
          setIsPopupOpen(false);
        }}
        className="text-white font-bold py-2 px-4 rounded-lg w-full bg-green-600 hover:bg-green-500 mb-2"
      >
        <i className="fa-solid fa-list-check"></i> Students
      </button>
      <button
        onClick={() => {
          setCurrentContent("teachers");
          setIsPopupOpen(false);
        }}
        className="text-white font-bold py-2 px-4 rounded-lg w-full bg-blue-600 hover:bg-blue-500 mb-2"
      >
        <i className="fa-solid fa-list-check"></i> Teachers
      </button>

      <button
        onClick={() => {
          setCurrentContent("reports");
          setIsPopupOpen(false);
        }}
        className="text-white font-bold py-2 px-4 rounded-lg w-full bg-purple-600 hover:bg-purple-500 mb-2"
      >
        <i className="fa-regular fa-eye"></i> Reports
      </button>

      <button
        onClick={() => {
          setCurrentContent("add-admin");
          setIsPopupOpen(false);
        }}
        className="text-white font-bold py-2 px-4 rounded-lg w-full bg-gray-600 hover:bg-gray-500 mb-2"
      >
        <i className="fa-solid fa-user-tie"></i> Add Admin
      </button>

      <button
        onClick={() => {
          setCurrentContent("settings");
          setIsPopupOpen(false);
        }}
        className="text-white font-bold py-2 px-4 rounded-lg w-full bg-gray-600 hover:bg-gray-500 mb-2"
      >
        <i className="fa-solid fa-school"></i> Settings
      </button>

      <button
        onClick={handleLogout}
        className="text-white bg-red-500 font-bold py-2 px-4 rounded-lg w-[60px]"
        aria-label="logout"
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </>
  );

  return (
    <div className="grid grid-rows-[50px,1fr] lg:grid-rows-1 grid-cols-1 lg:grid-cols-[1fr,3fr] gap-2 max-h-screen min-h-full">
      {/* Sidebar for larger screens */}
      <section className="hidden lg:flex flex-col bg-white h-[500px] justify-start items-start px-4">
        <div className="grid grid-rows-[20px,1fr,1fr,1fr,1fr,1fr] gap-4 justify-center bg-blue-100 p-4 w-full rounded-2xl shadow-sm">
          <h2 className="flex justify-center items-center text-xl font-semibold text-gray-800">
            <strong>Admin Dashboard</strong>
          </h2>
          {adminName && (
            <h3 className="text-gray-800 text-center">Hello, {adminName}</h3>
          )}
          <DashboardButtons />
        </div>
      </section>

      {/* Navbar for smaller screens */}
      <section className="lg:hidden p-4 bg-slate-300 flex flex-1 flex-col max-h-fit">
        <h2 className="flex justify-center items-center text-xl font-semibold text-gray-800">
          <strong>Admin Dashboard</strong>
        </h2>

        {adminName && (
          <h3 className="text-gray-800 text-center">Hello, {adminName}</h3>
        )}

        <button
          onClick={handlePopupToggle}
          className="text-black bg-slate-300 font-bold py-2 px-4 rounded-lg w-[60px]"
          aria-label="Open Dashboard Menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {isPopupOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
          >
            <div
              className="bg-white rounded-lg p-6 w-11/12 max-w-xs transition transform duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handlePopupToggle}
                className="mt-4 text-gray-600 hover:text-gray-800 float-end"
                aria-label="Close Menu"
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                Admin Dashboard
              </h2>

              <DashboardButtons />
            </div>
          </div>
        )}
      </section>

      {/* Main content section */}
      <section className="bg-slate-600 flex flex-1 flex-col text-white p-4 mt-10">
        {children}
      </section>
    </div>
  );
};

export default Layout;
