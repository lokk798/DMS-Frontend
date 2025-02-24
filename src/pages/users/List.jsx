import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../../store';

export { List };

function List() {
    const users = useSelector((x) => {
        console.log(JSON.stringify(x));
        return x.users.list;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getUsers());
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                <Link to="add" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    + Add User
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-700">
                            <th className="px-6 py-3 text-left font-semibold">First Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Last Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Username</th>
                            <th className="px-6 py-3 text-left font-semibold">Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.value?.map((user) => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-3">{user.firstName}</td>
                                <td className="px-6 py-3">{user.lastName}</td>
                                <td className="px-6 py-3">{user.username}</td>
                                <td className="px-6 py-3">{user.roles || 'N/A'}</td>
                            </tr>
                        ))}
                        {users?.loading && (
                            <tr>
                                <td colSpan="4" className="text-center py-6">
                                    <span className="animate-spin h-6 w-6 border-4 border-gray-300 border-t-blue-600 rounded-full"></span>
                                </td>
                            </tr>
                        )}
                        {users?.error && (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-red-500">
                                    Error loading users: {users.error}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
