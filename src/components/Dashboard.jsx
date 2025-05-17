import React from "react";
import { authActions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { List } from "../pages/users/List";

export { DashboardUI };

function DashboardUI() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Optionally clear Redux state if you're using Redux
    dispatch(authActions.logout());

    // Redirect to the login page
    window.location.href = "/login";
  };

  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload.roles?.includes("ADMIN");
    } catch (e) {
      console.error("Invalid token format", e);
    }
  }

  // Now you can use isAdmin
  console.log("Is Admin:", isAdmin);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-white/90 backdrop-blur-sm shadow-xl p-6 flex flex-col space-y-6 border-r border-white/20">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isAdmin ? "Admin Dashboard" : "User Dashboard"}
          </h2>
        </div>

        <div className="space-y-4">
          {isAdmin ? (
            <>
              <Link
                to="/users/add"
                className="flex items-center px-4 py-3 bg-slate-50/50 text-slate-800 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition duration-300 border border-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add User
              </Link>

              <Link
                to="/departments/add"
                className="flex items-center px-4 py-3 bg-slate-50/50 text-slate-800 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition duration-300 border border-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Department
              </Link>

              <Link
                to="/categories/add"
                className="flex items-center px-4 py-3 bg-slate-50/50 text-slate-800 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition duration-300 border border-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Category
              </Link>

              <Link
                to="/departments"
                className="flex items-center px-4 py-3 bg-slate-50/50 text-slate-800 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition duration-300 border border-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h11M9 21V3m0 0L3 10m6-7l6 7"
                  />
                </svg>
                List Departments
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/upload"
                className="flex items-center px-4 py-3 bg-slate-50/50 text-slate-800 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition duration-300 border border-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Upload Document
              </Link>

              <Link
                to="/documentsTable"
                className="flex items-center px-4 py-3 bg-slate-50/50 text-slate-800 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition duration-300 border border-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Documents Table
              </Link>
            </>
          )}
        </div>

        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-rose-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>

        <div className="text-center text-xs text-slate-500 pt-4">
          <p>© 2025 Enterprise DMS</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 border border-white/20 h-full">
          <div className="w-full">
            {isAdmin ? <List /> : <p>Welcome to your dashboard!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
