import { ReactNode, createContext, useState } from 'react';
import { TaskContextType, Column, Task, TaskMap } from '../types';

type TaskProviderProp = {
  children: ReactNode;
};

export const TaskContext = createContext({} as TaskContextType);

export function TaskProvider({ children }: TaskProviderProp) {
  const [currentColumn, setCurrentColumn] = useState<Column>({} as Column);
  const [currentTask, setCurrentTask] = useState<Task>({} as Task);
  const [currentTasksMap, setCurrentTasksMap] = useState<TaskMap>(
    {} as TaskMap
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBoardIdx, setCurrentBoardIdx] = useState(0);

  return (
    <TaskContext.Provider
      value={{
        isModalOpen,
        isEditModalOpen,
        currentColumn,
        currentTask,
        currentTasksMap,
        currentBoardIdx,
        setIsModalOpen,
        setIsEditModalOpen,
        setCurrentColumn,
        setCurrentTask,
        setCurrentBoardIdx,
        setCurrentTasksMap,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
