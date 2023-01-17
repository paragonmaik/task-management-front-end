import { TaskState } from '../../typescript/types';
import { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskContext } from '../../context/TaskContext';
import TaskCSS from './task.module.css';
import menu from '../../../public/task-menu.svg';

type TaskProps = {
	loading?: boolean;
	tasksList: TaskState[] | undefined;
};

function Task({ tasksList }: TaskProps) {
	const { isEditModalOpen, setIsEditModalOpen, setCurrentTask } =
		useContext(TaskContext);

	return (
		<>
			{tasksList?.map(({ _id, description }, i) => (
				<Draggable
					key={_id}
					draggableId={_id}
					index={i}
				>
					{(provided) => (
						<div
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}
						>
							<div
								className={TaskCSS.bg}
								id={_id}
								key={_id}
							>
								<div className={TaskCSS.menuContainer}>
									<img
										onClick={() => {
											setIsEditModalOpen(!isEditModalOpen);
											// setCurrentTaskId(_id);
										}}
										src={menu}
									/>
								</div>
								<div className={TaskCSS.detailsContainer}>
									<p>{description}</p>
									<p>placeholder</p>
								</div>
							</div>
						</div>
					)}
				</Draggable>
			))}
		</>
	);
}

export default Task;
