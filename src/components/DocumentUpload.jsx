import { useState } from "react";
import { Link } from "react-router-dom";

const DocumentUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!uploadedFile) newErrors.file = "You must upload a file";
    else {
      if (uploadedFile.size > 2 * 1024 * 1024)
        newErrors.file = "File size must be less than 2MB";

      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!validTypes.includes(uploadedFile.type))
        newErrors.file = "Only .pdf, .doc, .docx files are allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Drag & Drop handlers
  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Metadata:", { ...formData, file: uploadedFile });
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-indigo-600 mx-auto mb-6 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
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
        </div>

        {/* Upload Container */}
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20">
          {isSubmitted ? (
            /* Success Message */
            <div className="text-center">
              <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto mb-4 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold mb-2">Document Uploaded!</h3>
                <p>Your document has been successfully uploaded.</p>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="../dashboard"
                  className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ title: "", description: "", category: "" });
                    setUploadedFile(null);
                  }}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-slate-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Upload Another
                </button>
              </div>
            </div>
          ) : (
            /* Upload Form */
            <>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-800">
                  Upload Document
                </h2>
                <p className="text-slate-500 mt-2">
                  Add a new document to the system
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter document title"
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter document description"
                    rows="3"
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Category Field */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Enter category"
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    dragging
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="fileInput"
                    onChange={handleFileChange}
                  />

                  <div className="bg-indigo-100 p-3 rounded-lg mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>

                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-center"
                  >
                    <p className="text-slate-700 font-medium">
                      Drag & Drop your file here
                    </p>
                    <p className="text-slate-500 text-sm mt-1">
                      or click to select a file
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Supported formats: PDF, DOC, DOCX (Max: 2MB)
                    </p>
                  </label>
                </div>

                {/* Show file name if uploaded */}
                {uploadedFile && (
                  <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-600"
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
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-medium text-slate-800 truncate">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="p-1 rounded-full hover:bg-slate-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-slate-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                {errors.file && (
                  <p className="text-red-500 text-sm">{errors.file}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Upload Document
                </button>

                {/* Back Link */}
                <Link
                  to="../dashboard"
                  className="w-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-slate-300/30 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Back to Dashboard
                </Link>
              </form>
            </>
          )}
        </div>

        {/* Security note */}
        <div className="text-center mt-6 text-xs text-slate-500">
          <p>© 2025 Enterprise DMS • All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
