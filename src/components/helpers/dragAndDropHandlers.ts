import { DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { axiosRequest } from './axiosRequest';
import { token } from '../../token';
import { BoardState } from '../../typescript/types';

type DragListConfig = {
	currentBoardState: BoardState;
	setCurrentBoardState: (currentBoardState: BoardState) => void;
};

export const handleDnd: Record<string, CallableFunction> = {
	columns: (
		destination: DraggableLocation,
		source: DraggableLocation,
		config: DragListConfig
	) => {
		handleColumnDroppable(destination, source, config);
	},
	task: (
		destination: DraggableLocation,
		source: DraggableLocation,
		config: DragListConfig
	) => {
		handleTaskDroppable(destination, source, config);
	},
};

export const handleListDrag = (result: DropResult, config: DragListConfig) => {
	const { destination, source, type } = result;
	const { currentBoardState } = config;

	if (!currentBoardState) return 'Board is empty!';
	if (!destination) return;
	if (
		destination.index === source.index &&
		destination.droppableId === source.droppableId
	) {
		return;
	}

	handleDnd[type](destination, source, config);
};

const handleColumnDroppable = async (
	destination: DraggableLocation,
	source: DraggableLocation,
	config: DragListConfig
) => {
	const { currentBoardState, setCurrentBoardState } = config;
	const stateCopy = currentBoardState;

	if (!currentBoardState.columnsList) return 'List is empty!';

	// extracts item from array
	const [reorderedColumn] = currentBoardState.columnsList.splice(
		source.index,
		1
	);

	// updates array with item in a new position
	currentBoardState.columnsList.splice(destination.index, 0, reorderedColumn);

	// updates shallow copy
	stateCopy.columnsList = [...currentBoardState.columnsList];
	const columns = currentBoardState.columnsList.map(({ _id }) => _id);

	stateCopy.columns = columns;

	// updates the state with the reordered array
	setCurrentBoardState({ ...stateCopy });

	// request to update list
	await axiosRequest({
		url: `/board/columns/${currentBoardState._id}`,
		method: 'put',
		data: { columns },
		headers: { Authorization: token },
	});
};

const handleTaskDroppable = async (
	destination: DraggableLocation,
	source: DraggableLocation,
	config: DragListConfig
) => {
	const { currentBoardState, setCurrentBoardState } = config;
	const stateCopy = currentBoardState;

	if (!stateCopy.columnsList) return 'List is empty!';

	// shallow source column copy
	const [sourceColumn] = stateCopy.columnsList.filter(
		(column) => column.columnName === source.droppableId
	);

	// removed task from source column
	const [reorderedTask] = sourceColumn.tasksList.splice(source.index, 1);

	// shallow destination column copy
	const [destinationColumn] = stateCopy.columnsList.filter(
		(column) => column.columnName === destination.droppableId
	);

	// added task to destination column
	destinationColumn.tasksList.splice(destination.index, 0, reorderedTask);

	// extracted taskIds from updated tasksList
	const sourceTaskIds = sourceColumn.tasksList.map(({ _id }) => _id);
	const destinationTaskIds = destinationColumn.tasksList.map(({ _id }) => _id);

	// adds updated tasksList to state
	sourceColumn.tasks = sourceTaskIds;
	destinationColumn.tasks = destinationTaskIds;

	// updates the state with the reordered array
	setCurrentBoardState({ ...stateCopy });

	const updatedColumns =
		sourceColumn._id === destinationColumn._id
			? [destinationColumn]
			: [sourceColumn, destinationColumn];

	// // request to update column
	await axiosRequest({
		url: `/column/tasks/${currentBoardState._id}`,
		method: 'put',
		data: { updatedColumns },
		headers: { Authorization: token },
	});
};

export const getListStyle = (isDraggingOver: boolean) => ({
	border: isDraggingOver
		? '2px dashed hsl(240, 12%, 20%)'
		: '2px solid hsl(240, 15%, 15%)',
	borderRadius: '5px',
	padding: '4px',
	display: 'flex',
	gap: '6px',
});
