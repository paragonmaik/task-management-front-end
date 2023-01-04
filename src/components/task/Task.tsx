import { task } from '../../typescript/types';
import TaskCSS from './task.module.css';

interface ITask {
	loading?: boolean;
	tasksList: task[] | null;
}

function Task({ tasksList }: ITask) {
	return (
		<>
			{tasksList?.map(({ _id, description }) => (
				<div
					className={TaskCSS.bg}
					id={_id}
					key={_id}
				>
					<p>{description}</p>
					<p></p>
				</div>
			))}
		</>
	);
}

export default Task;
