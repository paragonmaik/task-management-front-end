import { useContext } from 'react';
import EditTaskModalCSS from './editTaskModal.module.css';
import { TaskContext } from '../../context/TaskContext';
import { Modal } from '../sub-components/modal/Modal';

function TaskDetailsModal() {
	const { isEditModalOpen, currentColumn, setIsEditModalOpen } =
		useContext(TaskContext);

	return (
		<Modal
			modalHeader={`Edit ${currentColumn.columnName} column task`}
			handleModal={setIsEditModalOpen}
			isModalOpen={isEditModalOpen}
		>
			<div>teste</div>
		</Modal>
	);
}

export default TaskDetailsModal;
