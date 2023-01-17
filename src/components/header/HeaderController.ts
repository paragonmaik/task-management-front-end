import { UserAuth, BoardState } from '../../typescript/types';

export const userLogout = (
	authUser: UserAuth,
	setAuthUser: (authUser: UserAuth) => void,
	navigate: CallableFunction
) => {
	const user = authUser;
	user.email = '';
	user.token = '';
	user.logged = false;

	// clears user data from context
	setAuthUser({ ...user });

	navigate('/login');
};

export const clearBoardState = (
	setCurrentBoardState: (currentBoardState: BoardState) => void
) => {
	const clearState = {
		boardName: '',
		columns: [],
		columnsList: [],
		_id: '',
	};
	setCurrentBoardState({ ...clearState });
};
