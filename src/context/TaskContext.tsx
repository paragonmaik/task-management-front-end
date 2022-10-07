import { createContext, useState } from 'react';
import { TaskProviderProp, Todo, TaskContextType, TasksState } from '../typescript/types';

export const TaskContext = createContext({} as TaskContextType);

export function TimerProvider({ children }: TaskProviderProp) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasksState, setTasksState] = useState<TasksState>({
    todo: {
      tasks: [{
        id: '1',
        title: 'Teste',
        description: 'lorem ipsum',
      }]
    },
    inProgress: {
      tasks: [{
        id: '10',
        title: 'teste',
        description: 'lorem ipsum',
      }]
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
