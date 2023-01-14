import ColumnsCSS from './columns.module.css';
import Column from '../column/Column';
import { createColumn } from './ColumnsController';
import { TaskContext } from '../../context/TaskContext';
import { useContext } from 'react';
import { getListStyle, handleListDrag } from '../helpers/dragAndDropHandlers';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { CreationForm } from '../sub-components/creationForm/CreationForm';

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
		<div className={ColumnsCSS.bg}>
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
			<div className={ColumnsCSS.formContainer}>
				<CreationForm
					createComponent={createColumn}
					config={{
						createdComponent: currentBoardState,
						setCreatedComponent: setCurrentBoardState,
						token: authUser.token,
						type: 'column',
					}}
				/>
			</div>
		</div>
	);
}
