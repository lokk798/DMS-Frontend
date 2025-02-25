import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import SearchFilter from "./SearchFilter";
import SortButton from "./SortButton";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, [page, search, filters, sortBy, order]);

  const fetchUsers = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users?page=${page}&per_page=${perPage}&sort_by=${sortBy}&order=${order}`,

        filters
      );
      setUsers(response.data.data);
      setTotalPages(response.data.pagination.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <SearchFilter setSearch={setSearch} setFilters={setFilters} />

      <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">
              <SortButton
                column="name"
                sortBy={sortBy}
                setSortBy={setSortBy}
                order={order}
                setOrder={setOrder}
              />
            </th>
            <th className="p-3 text-left">Position</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.position}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default UserTable;
