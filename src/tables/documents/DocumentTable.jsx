import { useState, useEffect } from "react";
import axios from "axios";

const DocumentTable = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        console.error("User is not logged in.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/documents?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const getDocumentIcon = (type) => {
    if (!type || typeof type !== "string") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
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

    switch (type.toUpperCase()) {
      case "PDF":
        return (
          <svg /* PDF icon */ className="h-5 w-5 text-red-500" /* ... */ />
        );
      case "DOCX":
        return (
          <svg /* DOCX icon */ className="h-5 w-5 text-blue-500" /* ... */ />
        );
      default:
        return (
          <svg /* Default icon */ className="h-5 w-5 text-gray-500" /* ... */ />
        );
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Document Management
        </h2>
        <p className="text-slate-500 mt-1">View your documents</p>
      </div>

      {/* Document Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200">
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                Title
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                Translated Title
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                Category
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                Department
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                Created By
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                Created Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">
                File URL
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
                    {doc.translatedTitle || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {doc.category?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {doc.department?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {doc.createdBy?.username || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {doc.fileUrl ? (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        View File
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-6 text-center text-slate-500">
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
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentTable;
