import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import SearchFilter from "./SearchFilter";
import SortButton from "../SortButton";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, [page, filters, sortBy, order]);

  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users?page=${page}&per_page=${perPage}&sort_by=${sortBy}&order=${order}`,
        { filters } // Send filters as an array inside an object with 'filters' key
      );
      setUsers(response.data.data);
      setTotalPages(response.data.pagination.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
        <p className="text-slate-500 mt-1">View and manage system users</p>
      </div>

      {/* Filters Component */}
      <SearchFilter setFilters={setFilters} />

      {/* User Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                <SortButton
                  column="id"
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                <SortButton
                  column="name"
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                <SortButton
                  column="status"
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                <SortButton
                  column="email"
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                <SortButton
                  column="phone"
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {user.id}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-800">
                    {user.name}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Inactive"
                          ? "bg-red-100 text-red-800"
                          : user.status === "On Leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : user.status === "Remote"
                          ? "bg-blue-100 text-blue-800"
                          : user.status === "Probation"
                          ? "bg-purple-100 text-purple-800"
                          : user.status === "Contract"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {user.phone}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-slate-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4.354a4 4 0 110 5.292V15M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="block font-medium">No users found</span>
                    <span className="text-xs">
                      Try adjusting your search filters
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <div className="mt-6">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default UserTable;
