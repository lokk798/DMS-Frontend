import { Link } from 'react-router-dom';

export { HelpUI };

function HelpUI() {


    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Help & Support</h2>
        <p className="text-center text-gray-600 mt-2">If you need assistance, refer to the documentation or contact support.</p>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
