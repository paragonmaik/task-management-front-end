import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { createTask } from './AddTaskModalController';
import { Modal } from '../sub-components/modal/Modal';
import AddTaskModalCSS from './addTaskModal.module.css';

function AddTaskModal() {
	const {
		isModalOpen,
		currentColumn,
		createdTasks,
		authUser,
		setIsModalOpen,
		setCreatedTasks,
	} = useContext(TaskContext);

	return (
		<Modal
			modalHeader={`Add a task to the ${currentColumn.columnName} column`}
			handleModal={setIsModalOpen}
			isModalOpen
		>
			<div className={AddTaskModalCSS.containerScrollWrapper}>
				<div className={AddTaskModalCSS.taskSettingsHeader}></div>
				<form
					onSubmit={(e) =>
						createTask(
							e,
							createdTasks,
							setCreatedTasks,
							currentColumn._id,
							authUser.token
						)
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
					<button
						className={AddTaskModalCSS.createTaskBtn}
						type='submit'
					>
						Create Task
					</button>
				</form>
			</div>
		</Modal>
	);
}

export default AddTaskModal;
