import { useContext } from 'react';
import EditTaskModalCSS from './editTaskModal.module.css';
import { TaskContext } from '../../context/TaskContext';
import { Modal } from '../sub-components/modal/Modal';

function EditTaskModal() {
	const {
		isEditModalOpen,
		setIsEditModalOpen,
		currentTask,
		currentBoardState,
		currentColumn,
	} = useContext(TaskContext);

	// const teste = currentBoardState.columnsList
	console.log(currentTask);
	console.log(currentColumn);

	return (
		<Modal
			modalHeader={`Edit task`}
			handleModal={setIsEditModalOpen}
			isModalOpen={isEditModalOpen}
		>
			<div>teste</div>
		</Modal>
	);
}

export default EditTaskModal;
