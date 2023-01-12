import { FormEvent } from 'react';
import { BoardState } from '../../typescript/types';
import { axiosRequest } from '../helpers/axiosRequest';

export const createColumn = async (
	e: FormEvent<HTMLFormElement>,
	currentBoardState: BoardState,
	setCurrentBoardState: (currentBoardState: BoardState) => void,
	token: string
) => {
	const stateCopy = currentBoardState;
	const columnName = getColumnName(e);

	const response = await axiosRequest({
		url: `/column/${currentBoardState._id}`,
		method: 'post',
		data: {
			columnName,
		},
		headers: {
			Authorization: token,
		},
	});

	// updates the state with newly created column
	stateCopy.columnsList?.push(response.data);
	stateCopy.columns?.push(response.data._id);
	setCurrentBoardState({ ...stateCopy });
};

const getColumnName = (e: FormEvent<HTMLFormElement>): string => {
	const maxColumnLength = 15;
	// prevents form reload
	e.preventDefault();

	const {
		columnName: { value },
	} = e.target as typeof e.currentTarget;

	// reset form values
	e.currentTarget.reset();

	if (!value) {
		throw new Error('Column name is required!');
	}

	if (value.length > maxColumnLength) {
		throw new Error('Column name should only be 14 characters long!');
	}

	return value;
};
