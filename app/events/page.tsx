"use client";
import React, { useEffect, useState } from "react";
import NewsItem from "@/components/Common/NewsItem";
import Loader from "@/components/Common/buttons/Loader";
import baseUrl from "@/utils/baseUrl";

// Define types for the update object
interface Update {
  _id: string;
  title: string;
  content: string;
  category: "Event" | "Announcement" | "News"; // Define the category types
  image: string;
  date: string;
}

const EventsAnnouncementsNewsPage = () => {
  const [updates, setUpdates] = useState<Update[]>([]); // State for updates
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator

  // Fetch data from the API
  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/update`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUpdates(data))
      .catch((error) => console.log("Error fetching updates:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Filter the data into categories
  const events = updates.filter((update) => update.category === "Event");
  const announcements = updates.filter(
    (update) => update.category === "Announcement"
  );
  const news = updates.filter((update) => update.category === "News");

  return (
    <div className="bg-gray-100 py-3 px-3 md:px-12 lg:px-20">
      <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center bg-gray-200">
        Events, Announcements & News
      </h1>

      <section className="mb-14 p-1 bg-red-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-pink-600 mb-6">Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {events.length > 0 ? (
            <NewsItem data={events} />
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </section>

      <section className="mb-14 p-1 bg-pink-50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-pink-600 mb-6">
          Announcements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {announcements.length > 0 ? (
            <NewsItem data={announcements} />
          ) : (
            <p>No announcements available.</p>
          )}
        </div>
      </section>

      <section className="p-1 bg-rose-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-pink-600 mb-6">News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {news.length > 0 ? (
            <NewsItem data={news} />
          ) : (
            <p>No news available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsAnnouncementsNewsPage;
