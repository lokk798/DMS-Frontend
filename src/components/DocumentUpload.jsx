import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schema
const docValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  file: yup
    .mixed()
    .test("required", "You must upload a file", (value) => value.length > 0)
    .test("fileSize", "File size must be less than 2MB", (value) =>
      value.length ? value[0].size <= 2 * 1024 * 1024 : true
    )
    .test("fileType", "Only .pdf, .doc, .docx files are allowed", (value) =>
      value.length
        ? [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(value[0].type)
        : true
    ),
});

const DocumentUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(docValidationSchema),
  });

  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setValue("file", files);
      setUploadedFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    setValue("file", e.target.files);
    setUploadedFile(e.target.files[0]);
  };

  const onSubmit = (data) => {
    alert("Document uploaded successfully!");
    console.log("Metadata:", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 px-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Upload a Document
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Enter document title"
              className="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Enter document description"
              rows="3"
              className="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              {...register("category")}
              type="text"
              placeholder="Enter category"
              className="w-full mt-1 p-3 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Drag and Drop File Upload */}
          <div
            className={`border-2 border-dashed ${
              dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 cursor-pointer transition`}
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
              {...register("file")}
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-sm">Drag & Drop your file here</p>
            <p className="text-xs text-gray-400">or click to select a file</p>
          </div>

          {/* Show file name if uploaded */}
          {uploadedFile && (
            <div className="mt-3 text-sm bg-gray-100 p-3 rounded-md flex justify-between">
              <span>{uploadedFile.name}</span>
              <span>{(uploadedFile.size / 1024).toFixed(2)} KB</span>
            </div>
          )}

          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold"
          >
            Upload Document
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload;
