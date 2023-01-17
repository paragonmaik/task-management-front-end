import { Outlet, Navigate } from 'react-router-dom';

type ProtectedRoutesProps = {
	isUserAuth: boolean;
};

export const ProtectedRoutes = ({ isUserAuth }: ProtectedRoutesProps) => {
	return isUserAuth ? <Outlet /> : <Navigate to='/login' />;
};
