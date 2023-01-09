import { DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { axiosRequest } from './axiosRequest';
import { token } from '../../token';
import { BoardState } from '../../typescript/types';

type DragListConfig = {
	itemsList: BoardState;
	setDraggableList: (itemsList: any) => void;
	parentComponentId: string;
};

type SingleDropConfig = {
	itemsList: BoardState;
	setDraggableList: (itemsList: any) => void;
	parentComponentId: string;
};

export const handleDnd: Record<string, CallableFunction> = {
	columns: (
		destination: DraggableLocation,
		source: DraggableLocation,
		config: SingleDropConfig
	) => {
		handleColumnDroppable(destination, source, config);
	},
	task: (
		destination: DraggableLocation,
		source: DraggableLocation,
		config: SingleDropConfig
	) => {
		handleTaskDroppable(destination, source, config);
	},
};

export const handleListDrag = (result: DropResult, config: DragListConfig) => {
	const { destination, source, type } = result;
	const { itemsList } = config;

	if (!itemsList) return 'List is empty!';
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
	config: SingleDropConfig
) => {
	const { itemsList, setDraggableList, parentComponentId } = config;
	console.log(itemsList);

	// extracts item from array
	const [reorderedColumn] = itemsList.columnsList.splice(source.index, 1);
	console.log(reorderedColumn);

	// updates array with item in a new position
	itemsList.columnsList.splice(destination.index, 0, reorderedColumn);

	// updates the state with the reordered array
	setDraggableList([...itemsList.columnsList]);

	const columns = itemsList.columnsList.map(({ _id }) => {
		return _id;
	});

	// request to update list // passar para outra função
	await axiosRequest({
		url: `/board/columns/${parentComponentId}`,
		method: 'put',
		data: { columns },
		headers: { Authorization: token },
	});
	// console.log('columns');
};

const handleTaskDroppable = async (
	destination: DraggableLocation,
	source: DraggableLocation,
	// type: string,
	config: SingleDropConfig
) => {
	// const { itemsList, setDraggableList, parentComponentId } = config;
	// console.log(source);
	// // extracts item from array
	// // const [reorderedTask] = itemsList.splice(source.index, 1);
	// const sourceColumn = itemsList.filter(
	// 	(item) => item.columnName === source.droppableId
	// );
	// const task = sourceColumn[source.index];
	// console.log(sourceColumn);
	// console.log(task);
	// // updates array with item in a new position
	// itemsList.splice(destination.index, 0, sourceColumn);
	// updates the state with the reordered array
	// setDraggableList([...itemsList]);
	// const tasks = itemsList.map((item) => {
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
