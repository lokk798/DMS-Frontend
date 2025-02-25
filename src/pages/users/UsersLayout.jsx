import { Routes, Route } from "react-router-dom";

import { List, AddEdit } from "./";

export { UsersLayout };

function UsersLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
        <Routes>
          <Route index element={<List />} />
          <Route path="add" element={<AddEdit />} />
          <Route path="edit/:id" element={<AddEdit />} />
        </Routes>
      </div>
    </div>
  );
}
