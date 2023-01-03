import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { task } from '../../typescript/types';
import TaskCSS from './task.module.css';

interface ITask {
	loading?: boolean;
	tasksList: task[] | null;
}

function Task({ tasksList }: ITask) {
	const { isTaskDetailsOpen, setIsTaskDetailsOpen, setCurrentTaskId } =
		useContext(TaskContext);

	// const handleTaskId = (id: string) => {
	// 	setCurrentTaskId(id);
	// 	setIsTaskDetailsOpen(!isTaskDetailsOpen);
	// };

	return (
		<>
			{tasksList?.map(({ _id, description }) => (
				<div
					className={TaskCSS.bg}
					id={`${_id}`}
					// onClick={() => handleTaskId(_id)}
				>
					<p>{description}</p>
					<p>
						{/* {subTasks.length > 1 ? `0 of ${subTasks?.length} subtasks.` : 'No subtasks for this task.'} */}
					</p>
				</div>
			))}
		</>
	);
}

export default Task;
