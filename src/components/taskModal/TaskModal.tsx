import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskModalCSS from './taskModal.module.css';

function TaskModal() {
  const { isModalOpen, setIsModalOpen } = useContext(TaskContext);

  const handleCloseMOdal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div
      className={ TaskModalCSS.modalContainer }
    >
      <div
        className={ TaskModalCSS.taskSettingsContainer }
      >
        <div>
          <h4>Add a task</h4>
          <button
            onClick={ handleCloseMOdal }
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskModal;
