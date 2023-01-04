import { FormEvent } from 'react';
import { task } from '../../typescript/types';
import { token } from '../../token';
import { axiosRequest } from '../helpers/axiosRequest';

export const closeAddTaskModal = (
	setIsModalOpen: (isModalOpen: boolean) => void,
	isModalOpen: boolean
) => {
	setIsModalOpen(!isModalOpen);
};

export const createTask = async (
	e: FormEvent<HTMLFormElement>,
	createdTasks: task[],
	setCreatedTask: (task: task[]) => void,
	currentColumnId: string
) => {
	const description = getTaskDescription(e);

	const response = await axiosRequest({
		url: `/task/${currentColumnId}`,
		method: 'post',
		data: {
			description,
		},
		headers: {
			Authorization: token,
		},
	});

	addTaskToState(response.data, createdTasks, setCreatedTask);
};

const getTaskDescription = (e: FormEvent<HTMLFormElement>): string => {
	const maxDescriptionLength = 151;
	// prevents form reload
	e.preventDefault();

	const {
		description: { value },
	} = e.target as typeof e.currentTarget;

	// reset form values
	e.currentTarget.reset();

	if (!value) {
		throw new Error('You need a description.');
	}

	if (value.length > maxDescriptionLength) {
		throw new Error('Your description is too long.');
	}

	return value;
};

const addTaskToState = async (
	responseData: task,
	createdTasks: task[],
	setCreatedTask: (task: task[]) => void
) => {
	const tasks = createdTasks;

	tasks.push(responseData);
	setCreatedTask([...tasks]);
};
