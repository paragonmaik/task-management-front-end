import { ColumnState, BoardState } from '../../typescript/types';

type AddColumnsConfig = {
	response: [] | null;
	currentBoardState: BoardState;
	setCurrentBoardState: (currentBoardState: BoardState) => void;
};

export const addColumnsToState = (taskConfig: AddColumnsConfig) => {
	const { response, currentBoardState, setCurrentBoardState } = taskConfig;

	if (!response) return;

	const columnsList: ColumnState[] = response;

	// adds tasksList property for each column
	columnsList.forEach((column) => {
		column.tasksList = [];
	});

	setCurrentBoardState({ ...currentBoardState, columnsList });
};
