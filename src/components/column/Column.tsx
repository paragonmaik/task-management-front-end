import { useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ColumnProps } from '../../typescript/types';
import { TaskContext } from '../../context/TaskContext';
import Task from '../task/Task';
import ColumnCSS from './column.module.css';

function Column({ colName }: ColumnProps) {
  const { tasksState } = useContext(TaskContext);

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
            <Droppable droppableId="todo">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasksState.todo.tasks?.map((task, i) => (
                    <Draggable key={task.id} draggableId={task.id} index={i}>
                      {(provided) => (
                        <div
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
          )}
          {colName === 'In Progress' && (
            <Droppable droppableId="inProgress">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasksState.inProgress.tasks?.map((task, i) => (
                    <Draggable key={task.id} draggableId={task.id} index={i}>
                      {(provided) => (
                        <div
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
          )}
          {colName === 'In Review' && (
            <Droppable droppableId="inReview">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasksState.inReview.tasks?.map((task, i) => (
                    <Draggable key={task.id} draggableId={task.id} index={i}>
                      {(provided) => (
                        <div
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
          )}
          {colName === 'Done' && (
            <Droppable droppableId="done">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasksState.done.tasks?.map((task, i) => (
                    <Draggable key={task.id} draggableId={task.id} index={i}>
                      {(provided) => (
                        <div
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
          )}
        </div>
      </section>
    </>
  )
}

export default Column;
