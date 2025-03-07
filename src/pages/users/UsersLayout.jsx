import { Routes, Route } from "react-router-dom";

import { List, AddEdit } from "./";

export { UsersLayout };

function UsersLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-white/20">
        <Routes>
          <Route index element={<List />} />
          <Route path="add" element={<AddEdit />} />
          <Route path="edit/:id" element={<AddEdit />} />
        </Routes>
      </div>
    </div>
  );
}
