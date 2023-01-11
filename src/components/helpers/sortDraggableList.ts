import { ColumnState } from '../../typescript/types';

export const sortDraggableList = (
	listToBeSorted: ColumnState[],
	sortedIdsList: string[]
) => {
	listToBeSorted?.sort(
		(a, b) => sortedIdsList.indexOf(a._id) - sortedIdsList.indexOf(b._id)
	);
};

export const sortDraggableTask = (listToBeSorted: ColumnState[]) => {
	for (const column of listToBeSorted) {
		column.tasksList?.sort(
			(a, b) => column.tasks?.indexOf(a._id) - column.tasks?.indexOf(b._id)
		);
	}
};
