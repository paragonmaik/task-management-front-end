import { useContext } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ColumnProps } from '../../typescript/types';
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
    setIsModalOpen,
    setTodoTasks,
  } = useContext(TaskContext);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(todoTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodoTasks(items);
  }

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
          {colName === 'To do' && (
            <DragDropContext onDragEnd={ handleOnDragEnd }>
              <Droppable droppableId="todoTasks">
                {(provided) => (
                  <div className='teste' {...provided.droppableProps} ref={provided.innerRef}>
                    {todoTasks?.map((task, i) => (
                      <Draggable key={task.id} draggableId={task.id} index={i}>
                        {(provided) => (
                          <div
                            className='teste'
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Task
                              {...task}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
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
