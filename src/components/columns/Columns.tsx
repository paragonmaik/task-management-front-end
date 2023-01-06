import columnsCSS from './columns.module.css';
import Column from '../column/Column';
import { column } from '../../typescript/types';
import { createColumn } from './ColumnsController';
import { TaskContext } from '../../context/TaskContext';
import { useContext, useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

interface IColumns {
	loading?: boolean;
	columnsList?: column[] | null;
}

export function Columns({ columnsList }: IColumns) {
	const { createdColumns, currentBoard, setCreatedColumns } =
		useContext(TaskContext);
	const [draggableColumnsList, setDraggableColumnsList] = useState(columnsList);

	useEffect(() => {
		setDraggableColumnsList(columnsList);
	});

	console.log('teste');
	const handleColumnDrag = (result: DropResult) => {
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

		if (!columnsList) return;

		// extracts column from array
		const [reorderedColumn] = columnsList.splice(source.index, 1);

		// updates array with column in a new position
		columnsList.splice(destination.index, 0, reorderedColumn);

		// updates the state with the reordered array
		setDraggableColumnsList([...columnsList]);
	};

	return (
		<div className={columnsCSS.bg}>
			<DragDropContext onDragEnd={handleColumnDrag}>
				{draggableColumnsList?.map(({ _id, columnName }, i) => (
					<Droppable
						key={_id}
						droppableId={`column${i}`}
						direction='horizontal'
					>
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								<Column
									key={_id}
									_id={_id}
									columnName={columnName}
									position={i}
								/>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				))}
			</DragDropContext>
			<form
				onSubmit={(e) =>
					createColumn(e, createdColumns, setCreatedColumns, currentBoard._id)
				}
			>
				<input
					id='columnName'
					type='text'
					placeholder='add new column'
				/>
				<button type='submit'>+</button>
			</form>
		</div>
	);
}
