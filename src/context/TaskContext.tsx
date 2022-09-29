import { createContext, useState } from 'react';
import { TaskProviderProp, Todo, TaskContextType } from '../typescript/types';

export const TaskContext = createContext({} as TaskContextType);

export function TimerProvider({ children }: TaskProviderProp) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoTasks, setTodoTasks] = useState<Todo[]>([{
    id: '1',
    title: 'teste',
    description: 'lorem ipsis',
  }]);
  const [inProgressTasks, setinProgressTasks] = useState<Todo[]>([{
    id: '1',
    title: 'teste',
    description: 'lorem ipsis',
  }]);
  const [inReviewTasks, setinReviewTasks] = useState<Todo[]>([{
    id: '1',
    title: 'teste',
    description: 'lorem ipsis',
  }]);
  const [doneTasks, setDoneTasks] = useState<Todo[]>([{
    id: '1',
    title: 'teste',
    description: 'lorem ipsis',
  }]);

  return <TaskContext.Provider value={
    {
      todoTasks,
      isModalOpen,
      inProgressTasks,
      inReviewTasks,
      doneTasks,
      setTodoTasks,
      setIsModalOpen,
      setinProgressTasks,
      setinReviewTasks,
      setDoneTasks,
    }
    }>
    {children}
  </TaskContext.Provider>
}
