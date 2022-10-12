import { TaskContext } from '../../context/TaskContext';
import { useContext, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TasksState } from '../../typescript/types';
import Column from '../column/Column';
import TaskModal from '../taskModal/TaskModal';
import taskContainerCSS from './taskContainer.module.css';
import { useLocalStorage } from '../../utils/useLocalStorage';

function TaskContainer() {
  const { isModalOpen, tasksState, setTasksState } = useContext(TaskContext);
  const [state, setState] = useLocalStorage<TasksState>('tasksState', tasksState);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    if (!state) return;

    const taskCopy = {...state[source.droppableId as keyof TasksState].tasks[source.index]}
    state[source.droppableId as keyof TasksState].tasks.splice(source.index, 1);
    state[destination.droppableId as keyof TasksState].tasks.splice(destination.index, 0, taskCopy);

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
    </div>
  )
}

export default TaskContainer;
