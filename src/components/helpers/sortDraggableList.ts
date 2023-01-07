export const sortDraggableList = (
	listToBeSorted: any[] | null,
	sortedIdsList: any[] | undefined
) => {
	if (!listToBeSorted) {
		return 'List is missing';
		// throw new Error('List is missing');
	}
	if (!sortedIdsList) {
		return 'Ids list is missing';
	}

	listToBeSorted.sort(
		(a, b) => sortedIdsList.indexOf(a._id) - sortedIdsList.indexOf(b._id)
	);
};
