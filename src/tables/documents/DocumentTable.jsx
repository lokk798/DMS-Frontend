// DocumentTable.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import DocumentFilter from "./DocumentFilter";
import SortButton from "../SortButton";

const DocumentTable = () => {
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchDocuments();
  }, [page, filters, sortBy, order]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/documents?page=${page}&per_page=${perPage}&sort_by=${sortBy}&order=${order}`,
        { filters }
      );
      setDocuments(response.data.data);
      setTotalPages(response.data.pagination.total_pages);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  // Function to get appropriate icon based on document type
  const getDocumentIcon = (type) => {
    switch (type.toUpperCase()) {
      case "PDF":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
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
        );
      case "DOCX":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
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
        );
      case "XLSX":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        );
      case "PPT":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
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
        );
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Document Management
        </h2>
        <p className="text-slate-500 mt-1">View and manage system documents</p>
      </div>

      {/* Filters Component */}
      <DocumentFilter setFilters={setFilters} />

      {/* Document Table */}
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
                  column="title"
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                  label="Title"
                />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                <SortButton
                  column="type"
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                  label="Type"
                />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                <SortButton
                  column="author"
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                  label="Author"
                />
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                <SortButton
                  column="created_date"
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  order={order}
                  setOrder={setOrder}
                  label="Created"
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
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-slate-700">{doc.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getDocumentIcon(doc.type)}
                      <span className="ml-2 text-sm font-medium text-slate-800">
                        {doc.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {doc.type}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {doc.author}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {doc.created_date}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        doc.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : doc.status === "Draft"
                          ? "bg-blue-100 text-blue-800"
                          : doc.status === "Archived"
                          ? "bg-gray-100 text-gray-800"
                          : doc.status === "Under Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-center text-slate-500">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="block font-medium">
                      No documents found
                    </span>
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

export default DocumentTable;
