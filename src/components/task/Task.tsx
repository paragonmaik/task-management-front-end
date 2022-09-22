import TaskCSS from './task.module.css';
import { Todo } from '../../typescript/types';

function Task({ title, description, id }: Todo) {
  
  return (
    <div
      className={ TaskCSS.bg }
      id={`${id}`}
    >
      <h3>
        {title}
      </h3>
      <p>
        {description}
      </p>
    </div>
  )
}

export default Task;
