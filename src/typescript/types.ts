import { ReactNode } from 'react';

export type ColumnProps = {
  colName: 'To do' | 'In Progress' | 'In Review' | 'Done';
}

export type TaskProviderProp = {
  children: ReactNode;
}

export type TaskContextType = {
  todoTasks: Todo[];
  isModalOpen: boolean,
  setTodoTasks: (todoTasks: Todo[]) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export interface Todo {
  title: string,
  description: string,
  id?: number,
}