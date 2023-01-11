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
import { sortDraggableTask } from '../helpers/sortDraggableList';

function Column({ columnName, _id, position }: DraggableColumn) {
	const {
		isModalOpen,
		setIsModalOpen,
		setCurrentColumn,
		setCurrentBoardState,
		createdTasks,
		currentBoardState,
		createdColumns,
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

	const getTasksFromState = () => {
		if (!currentBoardState.columnsList) {
			return;
		}

		const [tasks] = currentBoardState.columnsList.filter(
			(column) => column._id === _id
		);

		return tasks;
	};

	useEffect(() => {
		if (!response) return;
		const stateCopy = currentBoardState;
		const responseTasks: task[] = response;

		if (!stateCopy.columnsList) return;

		stateCopy.columnsList.forEach((column) => {
			if (column._id === _id) {
				column.tasksList = responseTasks;
			}
		});

		setCurrentBoardState({ ...stateCopy });
		sortDraggableTask(currentBoardState.columnsList);
	}, [response, createdColumns]);

	const tasksList = getTasksFromState();

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
											<Task tasksList={tasksList?.tasksList} />
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
