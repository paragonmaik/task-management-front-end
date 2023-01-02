import { FormEvent } from 'react';
import { board } from '../../typescript/types';
import { token } from '../../token';
import { axiosRequest } from '../helpers/axiosRequest';

export const createBoard = async (
	e: FormEvent<HTMLFormElement>,
	createdBoards: board[],
	setCreatedBoard: any
) => {
	const boardName = getBoardName(e);

	const response = await axiosRequest({
		url: '/board',
		method: 'post',
		data: {
			boardName,
		},
		headers: {
			Authorization: token,
		},
	});

	addBoardToState(response.data, createdBoards, setCreatedBoard);
};

const getBoardName = (e: FormEvent<HTMLFormElement>): string => {
	// prevents form reload
	e.preventDefault();

	const {
		boardName: { value },
	} = e.target as typeof e.currentTarget;

	// reset forms values
	e.currentTarget.reset();

	if (!value) {
		throw new Error('Board name is required!');
	}

	if (value.length > 15) {
		throw new Error('Board name should only be 14 characters long!');
	}

	return value;
};

const addBoardToState = async (
	responseData: board,
	createdBoards: board[],
	setCreatedBoard: (board: board[]) => void
) => {
	const boards = createdBoards;

	boards.push(responseData);
	setCreatedBoard([...boards]);
};
