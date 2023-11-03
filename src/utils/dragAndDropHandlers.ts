import { DropResult } from 'react-beautiful-dnd';
import { TaskMap, Column } from '../types';

export function handleColumnDrag(
  draggableColumns: Column[],
  { source, destination }: DropResult
) {
  if (!destination) return [];

  const columnsList = draggableColumns;
  const [column] = columnsList?.splice(source.index, 1);
  draggableColumns?.splice(destination.index, 0, column);

  return columnsList;
}

export function handleTaskDrag(
  draggableColumns: Column[],
  currentTasksMap: TaskMap,
  { source, destination }: DropResult
) {
  if (!destination) return [];

  const [sourceColumn] = draggableColumns.filter(
    (column) => column.columnName === source.droppableId
  );

  const [reorderedTask] = currentTasksMap[sourceColumn.columnName].splice(
    source.index,
    1
  );

  const [destinationColumn] = draggableColumns.filter(
    (column) => column.columnName === destination?.droppableId
  );

  currentTasksMap[destinationColumn.columnName].splice(
    destination.index,
    0,
    reorderedTask
  );

  sourceColumn.tasks = currentTasksMap[sourceColumn.columnName].map(
    ({ _id }) => _id
  );
  destinationColumn.tasks = currentTasksMap[destinationColumn.columnName].map(
    ({ _id }) => _id
  );

  const updatedColumns =
    sourceColumn._id === destinationColumn._id
      ? [destinationColumn]
      : [sourceColumn, destinationColumn];

  return updatedColumns;
}

export const getListStyle = (isDraggingOver: boolean) => ({
  border: isDraggingOver
    ? '2px dashed hsl(240, 12%, 20%)'
    : '2px solid hsl(240, 15%, 15%)',
  borderRadius: '5px',
  padding: '4px',
  display: 'flex',
  gap: '6px',
});
