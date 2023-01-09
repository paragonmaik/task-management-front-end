import columnsCSS from './columns.module.css';
import Column from '../column/Column';
import { column } from '../../typescript/types';
import { createColumn } from './ColumnsController';
import { TaskContext } from '../../context/TaskContext';
import { useContext } from 'react';
import { getListStyle, handleListDrag } from '../helpers/dragAndDropHandlers';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

export function Columns() {
	const {
		createdColumns,
		setCreatedColumns,
		currentBoardState,
		setCurrentBoardState,
	} = useContext(TaskContext);

	const handleColumnDrag = (result: DropResult) => {
		const handleDragConfig = { currentBoardState, setCurrentBoardState };
		handleListDrag(result, handleDragConfig);
	};

	return (
		<div className={columnsCSS.bg}>
			<DragDropContext onDragEnd={handleColumnDrag}>
				<Droppable
					type='columns'
					droppableId='columns'
					direction='horizontal'
				>
					{(provided, snapshot) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={getListStyle(snapshot.isDraggingOver)}
						>
							{currentBoardState.columnsList?.map(({ _id, columnName }, i) => (
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
					createColumn(
						e,
						createdColumns,
						setCreatedColumns,
						currentBoardState._id
					)
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
