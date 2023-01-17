import { useContext } from 'react';
import TaskDetailsCSS from './taskDetailsModal.module.css';
import { TaskContext } from '../../context/TaskContext';
import { ITask, currentTaskId } from '../../typescript/types';

function TaskDetailsModal({ id }: currentTaskId) {
  const { setIsTaskDetailsOpen, isTaskDetailsOpen } = useContext(TaskContext);

  function handleCloseModal() {
    setIsTaskDetailsOpen(!isTaskDetailsOpen);
  };
  
  return (
    <div
      className={ TaskDetailsCSS.modalContainer }
      onClick={ handleCloseModal }
    >
      <section
        className={ TaskDetailsCSS.taskSettingsContainer }
        onClick={ (e) => e.stopPropagation() }
      >
        {id}
      </section>
    </div>
  )
}

export default TaskDetailsModal;
