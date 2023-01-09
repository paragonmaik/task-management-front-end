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

	if (!currentBoardState) return 'List is empty!';
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

	// extracts item from array
	const [reorderedColumn] = currentBoardState.columnsList.splice(
		source.index,
		1
	);

	// updates array with item in a new position
	currentBoardState.columnsList.splice(destination.index, 0, reorderedColumn);

	// updates shallow copy
	stateCopy.columnsList = [...currentBoardState.columnsList];

	// updates the state with the reordered array
	setCurrentBoardState({ ...stateCopy });

	const columns = currentBoardState.columnsList.map(({ _id }) => _id);

	// request to update list
	await axiosRequest({
		url: `/board/columns/${currentBoardState._id}`,
		method: 'put',
		data: { columns },
		headers: { Authorization: token },
	});
	// console.log('columns');
};

const handleTaskDroppable = async (
	destination: DraggableLocation,
	source: DraggableLocation,
	config: DragListConfig
) => {
	// const { currentBoardState, setCurrentBoardState, parentComponentId } = config;
	// console.log(source);
	// // extracts item from array
	// // const [reorderedTask] = currentBoardState.splice(source.index, 1);
	// const sourceColumn = currentBoardState.filter(
	// 	(item) => item.columnName === source.droppableId
	// );
	// const task = sourceColumn[source.index];
	// console.log(sourceColumn);
	// console.log(task);
	// // updates array with item in a new position
	// currentBoardState.splice(destination.index, 0, sourceColumn);
	// updates the state with the reordered array
	// setCurrentBoardState([...currentBoardState]);
	// const tasks = currentBoardState.map((item) => {
	// 	return item.tasks;
	// });
	// console.log('task', tasks);
	// request to update list // passar para outra função
	// await axiosRequest({
	// 	url: `/column/tasks/${parentComponentId}`,
	// 	method: 'put',
	// 	data: { tasks },
	// 	headers: { Authorization: token },
	// });
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
