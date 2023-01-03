import { useContext } from 'react';
import { ColumnProps } from '../../typescript/types';
import { TaskContext } from '../../context/TaskContext';
import Task from '../task/Task';
import ColumnCSS from './column.module.css';

function Column({ columnName, _id }: ColumnProps) {
	const { isModalOpen, setIsModalOpen } = useContext(TaskContext);

	return (
		<>
			<section className={ColumnCSS.bg}>
				<p>{columnName}</p>
				<div className={ColumnCSS.taskContainer}></div>
				<button
					className={ColumnCSS.addBtn}
					type='button'
					onClick={() => setIsModalOpen(!isModalOpen)}
				>
					+
				</button>
			</section>
		</>
	);
}

export default Column;
