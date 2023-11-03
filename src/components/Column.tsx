import Task from './Task';
import ColumnCSS from './styles/column.module.css';
import useTask from '../hooks/useTask';
import { useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { sortDraggableTask } from '../utils/sortDraggableList';

type ColumnProps = {
  taskIds: string[] | undefined;
  columnName: string;
  _id: string;
  position: number;
};

function Column({ columnName, _id, position, taskIds }: ColumnProps) {
  const {
    isModalOpen,
    setIsModalOpen,
    setCurrentColumn,
    currentTasksMap,
    setCurrentTasksMap,
  } = useContext(TaskContext);
  const { data: tasks } = useTask(_id);

  useEffect(() => {
    if (tasks) {
      currentTasksMap[columnName] = tasks;
      setCurrentTasksMap(currentTasksMap);
    }
  }, [tasks]);

  const sortedTasks = sortDraggableTask(tasks, taskIds);

  function handleModal() {
    setCurrentColumn({ _id, columnName });
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Draggable key={_id} draggableId={_id} index={position}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <section className={ColumnCSS.bg}>
            <div className={ColumnCSS.handleBar} {...provided.dragHandleProps}>
              <p>{columnName}</p>
              <div>•••</div>
            </div>
            <div className={ColumnCSS.taskContainer}>
              <Droppable type="tasks" droppableId={columnName}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Task tasksList={sortedTasks} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <button
              className={ColumnCSS.addBtn}
              type="button"
              onClick={handleModal}
            >
              +
            </button>
          </section>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
