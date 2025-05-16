import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      // Redirect to the categories list page after successful creation
      navigate("/categories");
    } catch (err) {
      setError(err.message);
      console.error("Error adding category:", err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Add Category</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
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
    </div>
  );
}
