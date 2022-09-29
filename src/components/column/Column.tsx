import { ColumnProps } from '../../typescript/types';
import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import Task from '../task/Task';
import ColumnCSS from './column.module.css';

function Column({ colName }: ColumnProps) {
  const {
    todoTasks,
    inProgressTasks,
    inReviewTasks,
    doneTasks,
    isModalOpen,
    setIsModalOpen
  } = useContext(TaskContext);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };

  return (
    <>
      <section
        className={ ColumnCSS.bg }
      >
        <p>
          {colName}
        </p>
        <div
          className={ ColumnCSS.taskContainer }
        >
          {colName === 'To do' && todoTasks?.map((task) => (
            <Task
              key={task.id}
              {...task}
            />
          ))}
          {colName === 'In Progress' && inProgressTasks?.map((task) => (
            <Task
              key={task.id}
              {...task}
            />
          ))}
          {colName === 'In Review' && inReviewTasks?.map((task) => (
            <Task
              key={task.id}
              {...task}
            />
          ))}
          {colName === 'Done' && doneTasks?.map((task) => (
            <Task
              key={task.id}
              {...task}
            />
          ))}
        </div>
        {colName === 'To do' && <button
          type="button"
          onClick={ handleModal }
        >
          +
        </button>}
      </section>
    </>
  )
}

export default Column;
