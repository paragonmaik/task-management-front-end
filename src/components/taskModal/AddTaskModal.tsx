import { FormEvent, useContext, useState, useRef } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { ITasksState, ISubTasks } from '../../typescript/types';
import AddTaskModalCSS from './addTaskModal.module.css';
import { axiosRequest } from '../helpers/axiosRequest';
import { token } from '../../token';

function AddTaskModal() {
	const {
		isModalOpen,
		setIsModalOpen,
		tasksState,
		currentColumn,
		setCreatedTasks,
		createdTasks,
	} = useContext(TaskContext);
	const [_state, setState] = useLocalStorage('tasksState', tasksState);
	const [subTasks, setSubTasks] = useState<ISubTasks[]>([]);
	const subtaskInputRef = useRef<HTMLInputElement>(null);
	const createSubTaskBtn = useRef<HTMLButtonElement>(null);

	function handleCloseModal() {
		setIsModalOpen(!isModalOpen);
	}

	const createTask = async (e: FormEvent<HTMLFormElement>) => {
		const tasks = createdTasks;
		const maxDescriptionLength = 150;
		e.preventDefault();
		const {
			description: { value },
		} = e.target as typeof e.currentTarget;

		e.currentTarget.reset();

		if (!value) {
			throw new Error('You need a description.');
		}

		if (value.length > maxDescriptionLength) {
			throw new Error('Your description is too long.');
		}

		const response = await axiosRequest({
			url: `/task/${currentColumn._id}`,
			method: 'post',
			data: {
				description: value,
			},
			headers: {
				Authorization: token,
			},
		});

		tasks.push(response.data);
		setCreatedTasks([...tasks]);

		console.log(createdTasks);
	};

	console.log(currentColumn);

	return (
		<div
			className={AddTaskModalCSS.modalContainer}
			onClick={handleCloseModal}
		>
			<section
				className={AddTaskModalCSS.taskSettingsContainer}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={AddTaskModalCSS.closeModalContainer}>
					<h4>Add a task to {currentColumn.columnName} column</h4>
					<button
						className={AddTaskModalCSS.closeModal}
						onClick={handleCloseModal}
					>
						×
					</button>
				</div>
				<div className={AddTaskModalCSS.containerScrollWrapper}>
					<div className={AddTaskModalCSS.taskSettingsHeader}></div>

					<form
						onSubmit={(e) => createTask(e)}
						className={AddTaskModalCSS.form}
					>
						<label htmlFor='description'>Description</label>
						<textarea
							id='description'
							className={AddTaskModalCSS.descriptionInput}
							name='description'
							placeholder='Task description'
						/>
						<label htmlFor='sub-Tasks'>Subtasks</label>
						{subTasks.length > 0 && (
							<div className={AddTaskModalCSS.subTasksWrapper}>
								{subTasks.map(({ description, id }) => (
									<div
										key={id}
										className={AddTaskModalCSS.subTaskContainer}
									>
										<p>{description}</p>
										<button
											type='button'
											// onClick={() => removeSubTaks(id)}
											className={AddTaskModalCSS.deleteSubTaskBtn}
										>
											×
										</button>
									</div>
								))}
							</div>
						)}
						<input
							ref={subtaskInputRef}
							className={AddTaskModalCSS.subTaskInput}
							type='text'
							id='sub-Tasks'
							placeholder='Subtask'
						/>
						<button
							// onClick={createSubTask}
							className={AddTaskModalCSS.createSubTaskBtn}
							type='button'
							ref={createSubTaskBtn}
						>
							Add Subtask
						</button>
						<button
							className={AddTaskModalCSS.createTaskBtn}
							type='submit'
						>
							Create Task
						</button>
					</form>
				</div>
			</section>
		</div>
	);
}

export default AddTaskModal;
