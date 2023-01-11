import { BoardState, column } from '../../typescript/types';

export const getTasksFromState = (
	currentBoardState: BoardState,
	currentColumnId: string
) => {
	if (!currentBoardState.columnsList) {
		return;
	}

	const [tasks] = currentBoardState.columnsList.filter(
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
