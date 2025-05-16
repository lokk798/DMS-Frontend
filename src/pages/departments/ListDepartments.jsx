import { useEffect, useState } from "react";

export default function ListDepartments() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Departments</h1>
      {error && <div className="text-red-600 mb-4">Error: {error}</div>}
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {departments.map((department) => (
          <li key={department.id} className="mb-2">
            {department.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
