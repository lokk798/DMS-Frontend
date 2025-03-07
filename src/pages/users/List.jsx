import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "../../store";

export { List };

function List() {
  const users = useSelector((x) => {
    console.log(JSON.stringify(x));
    return x.users.list;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getUsers());
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(userActions.deleteUser(id)).unwrap();
        dispatch(userActions.getUsers());
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Users (Redux State Management)</h1>
        <Link
          to="/users/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add User
        </Link>
      </div>

      <div className="overflow-x-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-50/50">
            <tr className="text-slate-700">
              <th className="px-6 py-4 text-left font-semibold">First Name</th>
              <th className="px-6 py-4 text-left font-semibold">Last Name</th>
              <th className="px-6 py-4 text-left font-semibold">Username</th>
              <th className="px-6 py-4 text-left font-semibold">Roles</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.value?.map((user) => (
              <tr key={user.id} className="border-t hover:bg-slate-50/50">
                <td className="px-6 py-4 text-slate-800">{user.firstName}</td>
                <td className="px-6 py-4 text-slate-800">{user.lastName}</td>
                <td className="px-6 py-4 text-slate-800">{user.username}</td>
                <td className="px-6 py-4 text-slate-800">{user.role}</td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    to={`/users/edit/${user.id}`}
                    className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1 rounded-lg shadow-md hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white font-medium px-3 py-1 rounded-lg shadow-md hover:shadow-rose-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users?.loading && (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  <div className="inline-block animate-spin h-8 w-8 border-4 border-slate-200 border-t-indigo-600 rounded-full"></div>
                </td>
              </tr>
            )}
            {users?.error && (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  <div className="bg-rose-50 text-rose-600 p-4 rounded-xl inline-flex items-center">
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
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Error loading users: {users.error}
                  </div>
                </td>
              </tr>
            )}
            {users?.value?.length === 0 && !users?.loading && !users?.error && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-slate-500">
                  No users found. Click "Add User" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6 text-xs text-slate-500">
        <p>© 2025 Enterprise DMS • All rights reserved</p>
      </div>
    </div>
  );
}
