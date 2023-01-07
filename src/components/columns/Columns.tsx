import columnsCSS from './columns.module.css';
import Column from '../column/Column';
import { column } from '../../typescript/types';
import { createColumn } from './ColumnsController';
import { TaskContext } from '../../context/TaskContext';
import { useContext, useState, useEffect } from 'react';
import { handleListDrag, getListStyle } from '../helpers/dragAndDropHandlers';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

interface IColumns {
	loading?: boolean;
	columnsList?: column[] | null;
}

export function Columns({ columnsList }: IColumns) {
	const { createdColumns, currentBoard, setCreatedColumns } =
		useContext(TaskContext);
	const [draggableColumnsList, setDraggableColumnsList] = useState(columnsList);
	const handleDragConfig = {
		itemsList: columnsList,
		setDraggableList: setDraggableColumnsList,
		parentComponentId: currentBoard._id,
	};

	useEffect(() => {
		setDraggableColumnsList(columnsList);
	}, [columnsList]);

	const handleColumnDrag = (result: DropResult) => {
		handleListDrag(result, handleDragConfig);
	};

	return (
		<div className={columnsCSS.bg}>
			<DragDropContext onDragEnd={handleColumnDrag}>
				<Droppable
					droppableId={'columns'}
					direction='horizontal'
				>
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{draggableColumnsList?.map(({ _id, columnName }, i) => (
								<Column
									key={_id}
									_id={_id}
									position={i}
									columnName={columnName}
								/>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
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
