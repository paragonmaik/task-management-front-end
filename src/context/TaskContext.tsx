import { createContext, useState } from 'react';
import { TaskProviderProp, Todo, TaskContextType } from '../typescript/types';

export const TaskContext = createContext({} as TaskContextType);

export function TimerProvider({ children }: TaskProviderProp) {
  const [todoTasks, setTodoTasks] = useState<Todo[]>([{
    id: 1,
    title: 'teste',
    description: 'lorem ipsis',
  }]);

  return <TaskContext.Provider value={
    {
      todoTasks,
      setTodoTasks,
    }
    }>
    {children}
  </TaskContext.Provider>
}
