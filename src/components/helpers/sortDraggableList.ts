import { ColumnState } from '../../typescript/types';

export const sortDraggableList = (
	listToBeSorted: any[] | undefined,
	sortedIdsList: any[] | undefined
) => {
	if (!listToBeSorted) {
		return 'List is missing';
	}
	if (!sortedIdsList) {
		return 'Ids list is missing';
	}

	listToBeSorted.sort(
		(a, b) => sortedIdsList.indexOf(a._id) - sortedIdsList.indexOf(b._id)
	);
};

export const sortDraggableTask = (
	listToBeSorted: ColumnState[] | undefined
) => {
	if (!listToBeSorted) {
		return 'List is missing';
	}

	for (const column of listToBeSorted) {
		column.tasksList?.sort(
			(a, b) => column.tasks?.indexOf(a._id) - column.tasks?.indexOf(b._id)
		);
	}
};
