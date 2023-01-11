import { BoardState, column, task } from '../../typescript/types';

type AddTaskConfig = {
	response: [] | null;
	currentBoardState: BoardState;
	setCurrentBoardState: (currentBoardState: BoardState) => void;
	currentColumnId: string;
};

export const addTasksToState = (taskConfig: AddTaskConfig) => {
	const { response, currentBoardState, setCurrentBoardState, currentColumnId } =
		taskConfig;

	if (!response) return;
	const stateCopy = currentBoardState;
	const responseTasks: task[] = response;

	if (!stateCopy.columnsList) return;

	stateCopy.columnsList.forEach((column) => {
		if (column._id === currentColumnId) {
			column.tasksList = responseTasks;
		}
	});

	setCurrentBoardState({ ...stateCopy });
};

export const getTasksFromState = (
	currentBoardState: BoardState,
	currentColumnId: string
) => {
	const { columnsList } = currentBoardState;

	if (!columnsList) {
		return;
	}

	const [tasks] = columnsList.filter(
		(column) => column._id === currentColumnId
	);

	return tasks;
};

export const openAddTaskModal = (
	setCurrentColumn: (currentColumn: column) => void,
	column: column,
	setIsModalOpen: (isModalOpen: boolean) => void,
	isModalOpen: boolean
) => {
	addCurrentColumnOnModal(setCurrentColumn, column);
	setIsModalOpen(!isModalOpen);
};

const addCurrentColumnOnModal = (
	setCurrentColumn: (currentColumn: column) => void,
	column: column
) => {
	setCurrentColumn(column);
};
