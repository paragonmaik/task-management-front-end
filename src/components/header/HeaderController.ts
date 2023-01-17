import { UserAuth } from '../../typescript/types';

export const userLogout = (
	authUser: UserAuth,
	setAuthUser: (authUser: UserAuth) => void,
	navigate: CallableFunction
) => {
	const user = authUser;
	user.email = '';
	user.token = '';
	user.logged = false;

	setAuthUser({ ...user });
	navigate('/login');
};
