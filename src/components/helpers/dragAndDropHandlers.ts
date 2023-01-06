import {
	DropResult,
	DraggingStyle,
	NotDraggingStyle,
} from 'react-beautiful-dnd';

export const handleListDrag = (
	result: DropResult,
	itemsList: any,
	setDraggableList: (itemsList: any) => void
) => {
	const { destination, source } = result;
	if (!destination) {
		return;
	}

	if (
		destination.index === source.index &&
		destination.droppableId === source.droppableId
	) {
		return;
	}

	if (!itemsList) return;

	// extracts item from array
	const [reorderedColumn] = itemsList.splice(source.index, 1);

	// updates array with item in a new position
	itemsList.splice(destination.index, 0, reorderedColumn);

	// updates the state with the reordered array
	setDraggableList([...itemsList]);
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
