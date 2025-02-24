import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export { PrivateRoute };

function PrivateRoute() {
    const auth = useSelector(x => x.auth.value);
    if (!auth) {
        return <Navigate to="/login"  />
    }

    return <Outlet />;
}