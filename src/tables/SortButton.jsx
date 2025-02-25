const SortButton = ({ column, sortBy, setSortBy, order, setOrder }) => {
  const toggleSort = () => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  };

  return (
    <button onClick={toggleSort} className="text-blue-500">
      {column} {sortBy === column ? (order === "asc" ? "▲" : "▼") : ""}
    </button>
  );
};

export default SortButton;
