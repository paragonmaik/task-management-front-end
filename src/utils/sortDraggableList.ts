import { Column, Task } from '../types';

export const sortDraggableList = (
  listToBeSorted: Column[] | undefined,
  sortedIdsList: string[] | undefined
) => {
  if (!sortedIdsList) return;

  listToBeSorted?.sort(
    (a, b) => sortedIdsList.indexOf(a._id) - sortedIdsList.indexOf(b._id)
  );

  return listToBeSorted;
};

export const sortDraggableTask = (
  listToBeSorted: Task[] | undefined,
  sortedIdsList: string[] | undefined
) => {
  if (!sortedIdsList) return;

  listToBeSorted?.sort(
    (a, b) => sortedIdsList.indexOf(a._id) - sortedIdsList.indexOf(b._id)
  );

  return listToBeSorted;
};
