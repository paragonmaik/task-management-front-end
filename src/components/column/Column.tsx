import Task from '../task/Task';
import ColumnCSS from './column.module.css';
import { useContext } from 'react';
import { column } from '../../typescript/types';
import { TaskContext } from '../../context/TaskContext';
import { useAxios } from '../hooks/useAxios';
import { token } from '../../token';
import { openAddTaskModal } from './ColumnController';

function Column({ columnName, _id }: column) {
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
			<section className={ColumnCSS.bg}>
				<p>{columnName}</p>
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
		</>
	);
}

export default Column;
