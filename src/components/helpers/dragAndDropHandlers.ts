import { DropResult, DraggableLocation } from 'react-beautiful-dnd';
import { axiosRequest } from './axiosRequest';
import { token } from '../../token';

type DragListConfig = {
	itemsList: any[] | null | undefined;
	setDraggableList: (itemsList: any) => void;
	parentComponentId: string;
};

type SingleDropConfig = {
	itemsList: any[];
	setDraggableList: (itemsList: any) => void;
	parentComponentId: string;
};

export const handleListDrag = (result: DropResult, config: DragListConfig) => {
	const { destination, source } = result;
	const { itemsList } = config;

	if (!itemsList) return 'List provided is empty.';

	if (!destination) return;

	if (
		destination.index === source.index &&
		destination.droppableId === source.droppableId
	) {
		return;
	}

	if (destination.droppableId === source.droppableId) {
		handleSingleDroppableArea(destination, source, config as SingleDropConfig);
		return;
	}
};

const handleSingleDroppableArea = async (
	destination: DraggableLocation,
	source: DraggableLocation,
	config: SingleDropConfig
) => {
	const { itemsList, setDraggableList, parentComponentId } = config;

	// extracts item from array
	const [reorderedColumn] = itemsList.splice(source.index, 1);

	// updates array with item in a new position
	itemsList.splice(destination.index, 0, reorderedColumn);

	// updates the state with the reordered array
	setDraggableList([...itemsList]);

	const columns = itemsList.map(({ _id }) => {
		return _id;
	});

	// request to update list
	await axiosRequest({
		url: `/board/columns/${parentComponentId}`,
		method: 'put',
		data: { columns },
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
