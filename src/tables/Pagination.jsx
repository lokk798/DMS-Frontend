const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
