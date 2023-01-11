import { FormEvent } from 'react';
import { column, BoardState } from '../../typescript/types';
import { token } from '../../token';
import { axiosRequest } from '../helpers/axiosRequest';

export const createColumn = async (
	e: FormEvent<HTMLFormElement>,
	createdColumns: column[],
	setCreatedColumns: (column: column[]) => void,
	currentBoardId: string,
	currentBoardState: BoardState,
	setCurrentBoardState: (currentBoardState: BoardState) => void
) => {
	const stateCopy = currentBoardState;
	const columnName = getColumnName(e);

	const response = await axiosRequest({
		url: `/column/${currentBoardId}`,
		method: 'post',
		data: {
			columnName,
		},
		headers: {
			Authorization: token,
		},
	});

	stateCopy.columnsList?.push(response.data);
	stateCopy.columns?.push(response.data._id);
	setCurrentBoardState({ ...stateCopy });
	// addColumnToState(response.data, createdColumns, setCreatedColumns);
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

const addColumnToState = async (
	responseData: column,
	createdColumns: column[],
	setCreatedColumns: (column: column[]) => void
) => {
	const columns = createdColumns;

	columns.push(responseData);
	setCreatedColumns([...columns]);
};
