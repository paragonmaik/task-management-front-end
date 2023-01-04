import { useContext, useState, useRef } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { ISubTasks } from '../../typescript/types';
import AddTaskModalCSS from './addTaskModal.module.css';
import { createTask, closeAddTaskModal } from './AddTaskModalController';

function AddTaskModal() {
	const {
		isModalOpen,
		setIsModalOpen,
		currentColumn,
		setCreatedTasks,
		createdTasks,
	} = useContext(TaskContext);
	const [subTasks, setSubTasks] = useState<ISubTasks[]>([]);
	const subtaskInputRef = useRef<HTMLInputElement>(null);
	const createSubTaskBtn = useRef<HTMLButtonElement>(null);

	return (
		<div
			className={AddTaskModalCSS.modalContainer}
			onClick={() => closeAddTaskModal(setIsModalOpen, isModalOpen)}
		>
			<section
				className={AddTaskModalCSS.taskSettingsContainer}
				// stops event bubbling so clicking anywhere besides the close modal
				// button or the outer div won't close the modal
				onClick={(e) => e.stopPropagation()}
			>
				<div className={AddTaskModalCSS.closeModalContainer}>
					<h4>Add a task to {currentColumn.columnName} column</h4>
					<button
						className={AddTaskModalCSS.closeModal}
						onClick={() => closeAddTaskModal(setIsModalOpen, isModalOpen)}
					>
						×
					</button>
				</div>
				<div className={AddTaskModalCSS.containerScrollWrapper}>
					<div className={AddTaskModalCSS.taskSettingsHeader}></div>

					<form
						onSubmit={(e) =>
							createTask(e, createdTasks, setCreatedTasks, currentColumn._id)
						}
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
