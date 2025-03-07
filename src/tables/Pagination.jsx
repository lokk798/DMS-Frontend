const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-slate-700">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium border ${
            page === 1
              ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium border ${
            page === totalPages
              ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          }`}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
