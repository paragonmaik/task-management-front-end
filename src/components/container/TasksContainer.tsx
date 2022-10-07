import { TaskContext } from '../../context/TaskContext';
import { useContext } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TasksState } from '../../typescript/types';
import Column from '../column/Column';
import TaskModal from '../taskModal/TaskModal';
import taskContainerCSS from './taskContainer.module.css';

function TaskContainer() {
  const { isModalOpen, tasksState } = useContext(TaskContext);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    const taskCopy = {...tasksState[source.droppableId as keyof TasksState].tasks[source.index]}
    tasksState[source.droppableId as keyof TasksState].tasks.splice(source.index, 1);
    tasksState[destination.droppableId as keyof TasksState].tasks.splice(destination.index, 0, taskCopy)
  }

  return (
    <div
      className={ taskContainerCSS.bg }
    >
      <DragDropContext onDragEnd={ handleOnDragEnd }>
        <Column colName={'To do'} />
        <Column colName={'In Progress'} />
        <Column colName={'In Review'} />
        <Column colName={'Done'} />
      </DragDropContext>
      {isModalOpen && <TaskModal />}
    </div>
  )
}

export default TaskContainer;
