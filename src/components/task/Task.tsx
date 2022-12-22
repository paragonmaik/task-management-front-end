import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { ITask } from '../../typescript/types';
import TaskCSS from './task.module.css';

function Task({ description, id, subTasks }: ITask) {
  const { isTaskDetailsOpen, setIsTaskDetailsOpen, setCurrentTaskId } = useContext(TaskContext);

  const handleTaskId = (id: string) => {
    setCurrentTaskId(id);
    setIsTaskDetailsOpen(!isTaskDetailsOpen)
  }
  
  return (
    <>
      <div
        className={ TaskCSS.bg }
        id={`${id}`}
        onClick={ () => handleTaskId(id) }
      >
        <p>
          {description}
        </p>
        <p>
          {subTasks.length > 1 ? `0 of ${subTasks?.length} subtasks.` : 'No subtasks for this task.'}
        </p>
      </div>
    </>
  )
}

export default Task;
