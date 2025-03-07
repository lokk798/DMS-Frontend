// DocumentFilter.jsx
import { useState, useEffect } from "react";

const DocumentFilter = ({ setFilters }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  // Apply filters whenever searchTerm, type, or status changes
  useEffect(() => {
    handleFilter();
  }, [searchTerm, type, status]);

  const handleFilter = () => {
    let filtersArray = [];
    if (searchTerm.trim() !== "") {
      filtersArray.push({ key: "title", op: "contains", value: searchTerm });
    }
    if (type !== "") {
      filtersArray.push({ key: "type", op: "eq", value: type });
    }
    if (status !== "") {
      filtersArray.push({ key: "status", op: "eq", value: status });
    }
    setFilters(filtersArray);
  };

  return (
    <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="col-span-1">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Search Documents
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Type Dropdown */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Document Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-white px-4 py-2.5 rounded-lg border border-slate-300 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">All Types</option>
            <option value="PDF">PDF</option>
            <option value="DOCX">DOCX</option>
            <option value="XLSX">XLSX</option>
            <option value="PPT">PPT</option>
            <option value="TXT">TXT</option>
            <option value="JPG">JPG</option>
            <option value="PNG">PNG</option>
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-white px-4 py-2.5 rounded-lg border border-slate-300 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            <option value="">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>
      </div>

      {/* Optional: Keep button for users who prefer button-based filtering */}
      <div className="mt-4">
        <button
          onClick={handleFilter}
          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default DocumentFilter;
