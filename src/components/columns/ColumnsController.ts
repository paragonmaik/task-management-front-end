import { FormEvent } from 'react';
import { column } from '../../typescript/types';
import { token } from '../../token';
import { axiosRequest } from '../helpers/axiosRequest';

export const createColumn = async (
	e: FormEvent<HTMLFormElement>,
	createdColumns: column[],
	setCreatedColumns: (column: column[]) => void,
	currentBoardId: string
) => {
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

	addColumnToState(response.data, createdColumns, setCreatedColumns);
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
