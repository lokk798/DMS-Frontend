const SortButton = ({ column, sortBy, setSortBy, order, setOrder }) => {
  const toggleSort = () => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  };

  // Define display names for columns
  const displayNames = {
    id: "ID",
    name: "Name",
    status: "Status",
    email: "Email",
    phone: "Phone",
  };

  return (
    <button
      onClick={toggleSort}
      className="inline-flex items-center text-left focus:outline-none group"
    >
      <span className="group-hover:text-indigo-600 transition-colors">
        {displayNames[column] || column}
      </span>
      <span
        className={`ml-1 transform transition-transform duration-200 ${
          sortBy === column
            ? "text-indigo-600"
            : "text-slate-400 opacity-0 group-hover:opacity-100"
        }`}
      >
        {sortBy === column ? (
          order === "asc" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
        )}
      </span>
    </button>
  );
};

export default SortButton;
