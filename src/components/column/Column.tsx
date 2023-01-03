import { useContext } from 'react';
import { column } from '../../typescript/types';
import { TaskContext } from '../../context/TaskContext';
import Task from '../task/Task';
import ColumnCSS from './column.module.css';

function Column({ columnName, _id }: column) {
	const { isModalOpen, setIsModalOpen, setCurrentColumn } =
		useContext(TaskContext);

	const addCurrentColumnToState = () => {
		setCurrentColumn({ columnName, _id });
	};

	const openAddTaskModal = () => {
		addCurrentColumnToState();
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			<section className={ColumnCSS.bg}>
				<p>{columnName}</p>
				<div className={ColumnCSS.taskContainer}></div>
				<button
					className={ColumnCSS.addBtn}
					type='button'
					onClick={openAddTaskModal}
				>
					+
				</button>
			</section>
		</>
	);
}

export default Column;
