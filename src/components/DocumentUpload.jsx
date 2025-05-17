import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DocumentUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    department: "",
  });
  const [departments, setDepartments] = useState([]); // To store department options
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch departments (if needed)
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to upload a document.");
          return;
        }

        const response = await fetch("http://localhost:8080/api/departments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch departments.");
        }

        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        alert("You must be logged in to upload a document.");
        return;
      }

      // Step 1: Create the document metadata
      const metadataResponse = await fetch(
        `http://localhost:8080/api/documents?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            category: { id: formData.category }, // Category ID
            department: { id: formData.department }, // Department ID
          }),
        }
      );

      if (!metadataResponse.ok) {
        throw new Error("Failed to create document metadata.");
      }

      const document = await metadataResponse.json();

      // Step 2: Upload the file
      const formDataObj = new FormData();
      formDataObj.append("file", uploadedFile);

      const fileResponse = await fetch(
        `http://localhost:8080/api/documents/upload?documentId=${document.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataObj,
        }
      );

      if (!fileResponse.ok) {
        throw new Error("Failed to upload the document file.");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error uploading document:", error);
      alert(
        "An error occurred while uploading the document. Please try again."
      );
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
                    setFormData({
                      title: "",
                      description: "",
                      category: "",
                      department: "",
                    });
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.title
                      ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.title && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.category
                      ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">Select Category</option>
                  <option value="1">General</option>
                  <option value="2">Administrative</option>
                  <option value="3">Training</option>
                </select>
                {errors.category && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Department Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.department
                      ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 transition-colors`}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.department}
                  </p>
                )}
              </div>

              {/* File Upload Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Upload File
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    dragging
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-300 bg-slate-50"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                >
                  <p className="text-slate-500">
                    Drag and drop your file here, or{" "}
                    <span className="text-indigo-600 font-medium">browse</span>
                  </p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-indigo-600 font-medium"
                  >
                    Choose a file
                  </label>
                </div>
                {uploadedFile && (
                  <p className="mt-2 text-sm text-slate-600">
                    Selected file: {uploadedFile.name}
                  </p>
                )}
                {errors.file && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.file}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Upload Document
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
