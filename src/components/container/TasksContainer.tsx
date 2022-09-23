import { TaskContext } from '../../context/TaskContext';
import { useContext } from 'react';
import Column from '../column/Column';
import TaskModal from '../taskModal/TaskModal';
import taskContainerCSS from './taskContainer.module.css';

function TaskContainer() {
  const { isModalOpen } = useContext(TaskContext);

  return (
    <div
      className={ taskContainerCSS.bg }
    >
      <Column colName={'To do'} />
      <Column colName={'In Progress'} />
      <Column colName={'In Progress'} />
      <Column colName={'Done'} />
      {isModalOpen && <TaskModal />}
    </div>
  )
}

export default TaskContainer;
