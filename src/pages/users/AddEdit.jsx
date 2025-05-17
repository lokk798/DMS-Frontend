import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../../utils";
import { userActions } from "../../store";

export { AddEdit };

function AddEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select user list from Redux store
  const users = useSelector((state) => state.users?.list?.value || []);

  // Validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    role: Yup.string()
      .oneOf(["user", "admin"], "Invalid role")
      .required("Role is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  // Load user data if editing
  useEffect(() => {
    if (id) {
      const userToEdit = users.find((u) => u.id === parseInt(id));
      if (userToEdit) {
        reset(userToEdit);
      }
    }
  }, [id, reset, users]);
  async function onSubmit(data) {
    try {
      console.log("Form data submitted:", data);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Admin token not found, please login as admin.");
        return;
      }
      console.log("Admin token retrieved:", token);

      const payload = {
        username: data.username,
        password: data.password,
        email: data.email || `${data.username}l@ensia.dz`,
        roles: [data.role.toUpperCase()],
        departments: null,
        token: token,
      };

      console.log("Payload to send:", payload);

      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: "cors", // important for CORS
        // credentials: "include", // uncomment if backend needs cookies/auth headers
      });

      console.log("Response status:", response.status);

      const result = await response.json();
      console.log("Response JSON:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to register user");
      }

      alert("User registered successfully!");
      history.navigate("/dashboard"); // your navigation logic
    } catch (error) {
      console.error("Registration error:", error.message);
      alert(`Registration error: ${error.message}`);
    }
  }
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="w-full max-w-2xl mx-auto my-12 px-6">
        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              {id ? "Edit User" : "Add New User"}
            </h2>
            <p className="text-slate-500 mt-2">
              {id ? "Update user information" : "Create a new user account"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.firstName
                      ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.firstName && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.lastName
                      ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 transition-colors`}
                />
                {errors.lastName && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Username
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  {...register("username")}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.username
                      ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 transition-colors`}
                />
              </div>
              {errors.username && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  {...register("password")}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.password
                      ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 transition-colors`}
                  placeholder={id ? "Leave blank to keep current password" : ""}
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Role
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <select
                  {...register("role")}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border appearance-none bg-right ${
                    errors.role
                      ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                  } focus:outline-none focus:ring-2 transition-colors`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.5rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {errors.role && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-4 pt-4">
              <div className="flex mt-4 sm:mt-0 space-x-2">
                <Link
                  to="/dashboard"
                  className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex-1 sm:flex-none text-center"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={() => reset()}
                  disabled={isSubmitting}
                  className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex-1 sm:flex-none"
                >
                  Reset
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {id ? "Update User" : "Create User"}
              </button>
            </div>
          </form>
        </div>

        {/* Security note */}
        <div className="text-center mt-6 text-xs text-slate-500">
          <p>© 2025 Enterprise DMS • All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
