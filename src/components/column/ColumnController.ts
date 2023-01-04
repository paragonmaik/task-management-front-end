import { column } from '../../typescript/types';

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
