import { ColumnProps } from '../../typescript/types';
import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import Task from '../task/Task';
import ColumnCSS from './column.module.css';

function Column({ colName }: ColumnProps) {
  const { todoTasks } = useContext(TaskContext);

  const handleAddTask = () => {
    console.log(todoTasks);
  };

  return (
    <section
      className={ ColumnCSS.bg }
    >
      <p>
        {colName}
      </p>
      <div
        className={ ColumnCSS.taskContainer }
      >
        {todoTasks?.map((task) => (
          <Task
            key={task.id}
            {...task}
          />
        ))}
        {/* <Task /> */}
      </div>
      {colName === 'To do' && <button
        type="button"
        onClick={ handleAddTask }
      >
        +
      </button>}
    </section>
  )
}

export default Column;
