import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListDepartments() {
  const [departments, setDepartments] = useState([]); // State for storing departments
  const [users, setUsers] = useState([]); // State for storing users
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in as an admin.");
        }

        const response = await fetch("http://localhost:8080/api/departments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch departments");
        }

        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching departments:", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in as an admin.");
        }

        const response = await fetch("http://localhost:8080/auth/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err);
      }
    };

    fetchDepartments();
    fetchUsers();
  }, []);

  const assignUserToDepartment = async (departmentId) => {
    if (!selectedUser) {
      alert("Please select a user to assign.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in as an admin.");
      }

      const response = await fetch(
        `http://localhost:8080/api/departments/${departmentId}/users/${selectedUser}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to assign user to department"
        );
      }

      alert("User assigned to department successfully!");
    } catch (err) {
      setError(err.message);
      console.error("Error assigning user to department:", err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Departments</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200"
        >
          Back to Dashboard
        </button>
      </div>
      {error && (
        <div className="text-red-600 mb-4 bg-red-50 p-4 rounded-lg shadow">
          Error: {error}
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {departments.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                  ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                  Assign User
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr
                  key={department.id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {department.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {department.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    <div className="flex items-center space-x-2">
                      <select
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="border border-slate-300 rounded-lg px-2 py-1"
                      >
                        <option value="">Select User</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.username}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => assignUserToDepartment(department.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                      >
                        Assign
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-slate-500 text-center py-6">
            No departments found.
          </div>
        )}
      </div>
    </div>
  );
}
