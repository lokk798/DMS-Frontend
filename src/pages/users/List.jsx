import { Link } from "react-router-dom";
import UserTable from "../../tables/users/UserTable"; // Import the UserTable component

export { List };

function List() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800"></h1>
        
      </div>

      {/* Render the UserTable component */}
      <UserTable />
    </div>
  );
}
