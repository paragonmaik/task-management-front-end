import TaskCSS from './task.module.css';
import { Todo } from '../../typescript/types';

function Task({ description, id }: Todo) {
  
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
