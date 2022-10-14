import TaskCSS from './task.module.css';
import { ITask } from '../../typescript/types';

function Task({ description, id }: ITask) {
  
  return (
    <div
      className={ TaskCSS.bg }
      id={`${id}`}
    >
      <p>
        {description}
      </p>
    </div>
  )
}

export default Task;
