import { task } from '../../typescript/types';
import TaskCSS from './task.module.css';
import { Draggable } from 'react-beautiful-dnd';

interface ITask {
	loading?: boolean;
	tasksList: task[] | null;
}

function Task({ tasksList }: ITask) {
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
								<p>{description}</p>
								<p></p>
							</div>
						</div>
					)}
				</Draggable>
			))}
		</>
	);
}

export default Task;

{
	/* <Draggable
	key={_id}
	draggableId={_id}
	index={position}
>
	{(provided) => (
		<div
			{...provided.draggableProps}
			ref={provided.innerRef}
		>
      <div
					className={TaskCSS.bg}
					id={_id}
					key={_id}
				>
					<p>{description}</p>
					<p></p>
				</div>
    </div>
	)}
</Draggable> */
}
