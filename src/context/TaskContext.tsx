import { createContext, useState } from 'react';
import { TaskProviderProp, TaskContextType, ITasksState } from '../typescript/types';

export const TaskContext = createContext({} as TaskContextType);

export function TimerProvider({ children }: TaskProviderProp) {
  const [currentTaskId, setCurrentTaskId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [tasksState, setTasksState] = useState<ITasksState>({
    todo: {
      tasks: []
    },
    inProgress: {
      tasks: []
    },
    inReview: {
      tasks: []
    },
    done: {
      tasks: []
    }
});

  return <TaskContext.Provider value={
    {
      isModalOpen,
      tasksState,
      isTaskDetailsOpen,
      currentTaskId,
      setIsModalOpen,
      setTasksState,
      setIsTaskDetailsOpen,
      setCurrentTaskId,
    }
    }>
    {children}
  </TaskContext.Provider>
}
