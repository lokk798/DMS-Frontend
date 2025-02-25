import { useState } from "react";

const SearchFilter = ({ setSearch, setFilters }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setFilters([{ key: "name", op: "contains", value: searchTerm }]);
  };

  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
