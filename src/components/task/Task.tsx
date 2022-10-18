import TaskCSS from './task.module.css';
import { ITask } from '../../typescript/types';

function Task({ description, id, subTasks }: ITask) {
  
  return (
    <div
      className={ TaskCSS.bg }
      id={`${id}`}
      onClick={ () => console.log(description, id, subTasks) }
    >
      <p>
        {description}
      </p>
      <p>
        {subTasks.length > 1 ? `0 of ${subTasks?.length} subtasks.` : 'No subtasks for this task.'}
      </p>
    </div>
  )
}

export default Task;
