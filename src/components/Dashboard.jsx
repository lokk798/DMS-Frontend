import React, { useState } from "react";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export { DashboardUI };

function DashboardUI() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    return dispatch(authActions.logout());
  };

  const [full_name, setFullName] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Dashboard
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Welcome, {full_name || "Guest"}
        </p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter your name..."
            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="mt-6 text-center space-y-3">
          <Link
            to="/users"
            className="block w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Manage Users
          </Link>

          <Link
            to="/upload"
            className="block w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Upload Document
          </Link>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
