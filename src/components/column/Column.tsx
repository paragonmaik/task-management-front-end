import Task from '../task/Task';
import ColumnCSS from './column.module.css';
import { useContext } from 'react';
import { DraggableColumn } from '../../typescript/types';
import { TaskContext } from '../../context/TaskContext';
import { useAxios } from '../hooks/useAxios';
import { token } from '../../token';
import { openAddTaskModal } from './ColumnController';
import { Draggable } from 'react-beautiful-dnd';

function Column({ columnName, _id, position }: DraggableColumn) {
	const { isModalOpen, setIsModalOpen, setCurrentColumn, createdTasks } =
		useContext(TaskContext);

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
								<Task tasksList={response} />
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
