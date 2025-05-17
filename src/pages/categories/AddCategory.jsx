import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [name, setName] = useState(""); // State for category name
  const [categories, setCategories] = useState([]); // State for storing categories
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // Navigation hook

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in as an admin.");
      }

      const response = await fetch("http://localhost:8080/api/categories", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data); // Update categories state
    } catch (err) {
      setError(err.message);
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in as an admin.");
      }

      // Make the API request to create a new category
      const response = await fetch("http://localhost:8080/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add category");
      }

      // Clear the input field and fetch the updated list of categories
      setName("");
      fetchCategories();
    } catch (err) {
      setError(err.message);
      console.error("Error adding category:", err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Add Category</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200"
        >
          Back to Dashboard
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Category Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-sm text-red-600">Error: {error}</div>
        )}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200"
        >
          Save Category
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Categories</h2>
        {categories.length > 0 ? (
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {category.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-slate-500 text-center">No categories found.</div>
        )}
      </div>
    </div>
  );
}
