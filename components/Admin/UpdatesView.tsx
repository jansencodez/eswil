import baseUrl from "@/utils/baseUrl";
import React, { useState, useEffect } from "react";

interface Post {
  _id: string;
  title: string;
  content: string;
  date: string; // This is the timestamp you will use
  category: string;
}

const UpdatesView: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Function to calculate time ago
  const timeAgo = (timestamp: string): string => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000
    );
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
    }
  };

  // Fetch posts from backend on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/update`); // Make sure your backend endpoint is correct
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Update the displayed time every minute
    const interval = setInterval(() => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          date: post.date, // Triggers re-render to update displayed time
        }))
      );
    }, 60000); // Update every 1 minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
    setNewTitle(post.title);
    setNewContent(post.content);
    setViewingPost(null); // Clear view mode when entering edit mode
  };

  const handleDeleteClick = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/update/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== id));
      } else {
        console.log("Error deleting post");
      }
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  const handleUpdateClick = async () => {
    if (editingPost) {
      try {
        const response = await fetch(`${baseUrl}/updates/${editingPost._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTitle,
            content: newContent,
          }),
        });

        if (response.ok) {
          const updatedPost = await response.json();

          if (updatedPost._id) {
            setPosts(
              posts.map((post) =>
                post._id === updatedPost._id
                  ? { ...post, title: newTitle, content: newContent }
                  : post
              )
            );
            setEditingPost(null);
            setNewTitle("");
            setNewContent("");
          } else {
            console.log("Error: Backend did not return a valid post");
          }
        } else {
          console.log("Error updating post: ", response.statusText);
        }
      } catch (error) {
        console.log("Error updating post:", error);
      }
    }
  };

  const handleViewClick = (post: Post) => {
    setViewingPost(post);
    setEditingPost(null); // Clear edit mode when entering view mode
  };

  const handleCloseView = () => {
    setViewingPost(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Updates (News, Announcements, Events)
      </h2>

      {/* Edit Post Form */}
      {editingPost && (
        <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Edit Post
          </h3>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-2 mb-4 border rounded w-full"
            placeholder="Title"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="p-2 mb-4 border rounded w-full"
            placeholder="Content"
          />
          <button
            onClick={handleUpdateClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Post
          </button>
        </div>
      )}

      {/* Posts List */}
      <div className="bg-gray-50 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold text-gray-700 p-4">
          Recent Updates
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Content</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {posts.map((post) => (
                <tr key={post._id} className="border-b">
                  <td className="py-2 px-4">{timeAgo(post.date)}</td>
                  <td className="py-2 px-4">{post.title}</td>
                  <td className="py-2 px-4">{post.content}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleViewClick(post)}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditClick(post)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(post._id)}
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
      </div>

      {/* Overlay for Viewing Post */}
      {viewingPost && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {viewingPost.title}
            </h3>
            <p className="text-gray-600 mb-4">{viewingPost.content}</p>
            <button
              onClick={handleCloseView}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatesView;
