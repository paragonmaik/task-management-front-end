import { TaskContext } from '../../context/TaskContext';
import { useContext, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ITasksState } from '../../typescript/types';
import { useLocalStorage } from '../../utils/useLocalStorage';
import TaskDetailsModal from '../taskDetailsModal/TaskDetailsModal';
import Column from '../column/Column';
import TaskModal from '../taskModal/TaskModal';
import taskContainerCSS from './taskContainer.module.css';

function TaskContainer() {
  const { isModalOpen, tasksState, isTaskDetailsOpen, setTasksState, currentTaskId } = useContext(TaskContext);
  const [state, setState] = useLocalStorage<ITasksState>('tasksState', tasksState);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    if (!state) return;

    const taskCopy = {...state[source.droppableId as keyof ITasksState].tasks[source.index]}
    state[source.droppableId as keyof ITasksState].tasks.splice(source.index, 1);
    state[destination.droppableId as keyof ITasksState].tasks.splice(destination.index, 0, taskCopy);

    setState(state);
  };
  
  useEffect(() => {
    setTasksState(state);
  }, []);

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
      {isTaskDetailsOpen && (
      <TaskDetailsModal id={currentTaskId} />
      )}
    </div>
  )
}

export default TaskContainer;
