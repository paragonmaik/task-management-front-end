import { createContext, useState } from 'react';
import { TaskProviderProp, TaskContextType, ITasksState } from '../typescript/types';

export const TaskContext = createContext({} as TaskContextType);

export function TimerProvider({ children }: TaskProviderProp) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setIsModalOpen,
      setTasksState,
    }
    }>
    {children}
  </TaskContext.Provider>
}
