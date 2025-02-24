import { Routes, Route } from "react-router-dom";
import { Login, HelpUI, DashboardUI, PrivateRoute } from "./components";
import { UsersLayout } from "./pages/users";
import { history } from "./utils";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  // initializing the history object to allow navigation from
  // anywhere in the react app..
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-xl">
        <Routes>
          {/* private pages */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardUI />} />
            <Route path="/users/*" element={<UsersLayout />} />
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
