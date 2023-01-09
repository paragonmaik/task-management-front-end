import Task from '../task/Task';
import ColumnCSS from './column.module.css';
import { task } from '../../typescript/types';
import { useContext, useEffect } from 'react';
import { DraggableColumn } from '../../typescript/types';
import { TaskContext } from '../../context/TaskContext';
import { useAxios } from '../hooks/useAxios';
import { token } from '../../token';
import { openAddTaskModal } from './ColumnController';
import { Draggable, Droppable } from 'react-beautiful-dnd';

function Column({ columnName, _id, position }: DraggableColumn) {
	const {
		isModalOpen,
		setIsModalOpen,
		setCurrentColumn,
		setCurrentBoardState,
		createdTasks,
		currentBoardState,
	} = useContext(TaskContext);

	const { response } = useAxios(
		{
			method: 'get',
			url: `/task/${_id}`,
			headers: {
				Authorization: token,
			},
		},
		[createdTasks]
	);

	useEffect(() => {
		if (!response) return;
		const stateCopy = currentBoardState;
		const tasksList: task[] = response;

		for (const column of stateCopy.columnsList) {
			if (tasksList[0]?.ownerColumn === column._id) {
				column.tasksList = tasksList;
			}
		}
		setCurrentBoardState({ ...stateCopy });
	}, [response]);

	return (
		<>
			<Draggable
				key={_id}
				draggableId={_id}
				index={position}
			>
				{(provided) => (
					<div
						{...provided.draggableProps}
						ref={provided.innerRef}
					>
						<section className={ColumnCSS.bg}>
							<div
								className={ColumnCSS.handleBar}
								{...provided.dragHandleProps}
							>
								<p>{columnName}</p>
								<div>•••</div>
							</div>
							<div className={ColumnCSS.taskContainer}>
								<Droppable
									type='task'
									droppableId={columnName}
								>
									{(provided) => (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
										>
											<Task tasksList={response} />
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</div>
							<button
								className={ColumnCSS.addBtn}
								type='button'
								onClick={() =>
									openAddTaskModal(
										setCurrentColumn,
										{ _id, columnName },
										setIsModalOpen,
										isModalOpen
									)
								}
							>
								+
							</button>
						</section>
					</div>
				)}
			</Draggable>
		</>
	);
}

export default Column;

{
	/* <DragDropContext onDragEnd={handleColumnDrag}>
	<Droppable droppableId={columnName}>
		{(provided) => (
			<div
				{...provided.droppableProps}
				ref={provided.innerRef}
			>
				<Task tasksList={response} />
				{provided.placeholder}
			</div>
		)}
	</Droppable>
</DragDropContext>; */
}
