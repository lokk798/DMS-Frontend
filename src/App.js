import { Routes, Route } from "react-router-dom";
import { Login, HelpUI, DashboardUI, PrivateRoute } from "./components";
import { UsersLayout } from "./pages/users";
import { history } from "./utils";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserTable from "./tables/users/UserTable";
import DocumentUpload from "./components/DocumentUpload";
import DocumentTable from "./tables/documents/DocumentTable";
import AddDepartment from "./pages/departments/AddDepartment";
import AddCategory from "./pages/categories/AddCategory";

function App() {
  // initializing the history object to allow navigation from
  // anywhere in the react app..
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full p-6 bg-white shadow-lg rounded-xl">
        <Routes>
          {/* private pages */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardUI />} />
            <Route path="/users/*" element={<UsersLayout />} />
            <Route path="/departments/add" element={<AddDepartment />} />
            <Route path="/categories/add" element={<AddCategory />} />

            <Route path="/upload" element={<DocumentUpload />} />
            <Route path="/usersTable" element={<UserTable />} />
            <Route path="/documentsTable" element={<DocumentTable />} />
            <Route path="*" element={<DashboardUI />} />
          </Route>
          {/* public pages */}
          <Route path="/Help" element={<HelpUI />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
