import taskContainerCSS from './taskContainer.module.css';
import Column from '../column/Column';

function TaskContainer() {

  return (
    <div
      className={ taskContainerCSS.bg }
    >
      <Column colName={'To do'} />
      <Column colName={'In Progress'} />
      <Column colName={'In Progress'} />
      <Column colName={'Done'} />
    </div>
  )
}

export default TaskContainer;
