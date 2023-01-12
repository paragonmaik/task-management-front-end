import columnsCSS from './columns.module.css';
import Column from '../column/Column';
import { createColumn } from './ColumnsController';
import { TaskContext } from '../../context/TaskContext';
import { useContext } from 'react';
import { getListStyle, handleListDrag } from '../helpers/dragAndDropHandlers';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

export function Columns() {
	const { currentBoardState, setCurrentBoardState, authUser } =
		useContext(TaskContext);

	const handleColumnDrag = (result: DropResult) => {
		const handleDragConfig = {
			currentBoardState,
			setCurrentBoardState,
			token: authUser.token,
		};
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
						currentBoardState,
						setCurrentBoardState,
						authUser.token
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
