import EditTaskModalCSS from './styles/editTaskModal.module.css';
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Modal } from './ui/Modal';

function EditTaskModal() {
  const { isEditModalOpen, setIsEditModalOpen, currentTask } =
    useContext(TaskContext);

  return (
    <Modal
      modalHeader={'Edit task'}
      handleModal={setIsEditModalOpen}
      isModalOpen={isEditModalOpen}
    >
      <p className={EditTaskModalCSS.bg}>{currentTask.description}</p>
    </Modal>
  );
}

export default EditTaskModal;
