import { ReactNode } from 'react';

export type ColumnProps = {
  colName: 'To do' | 'In Progress' | 'In Review' | 'Done';
}

export type TaskProviderProp = {
  children: ReactNode;
}

export interface Todo {
  title: string,
  description: string,
  id?: number,
}

export type TaskContextType = {
  todoTasks: Todo[];
  inProgressTasks: Todo[];
  inReviewTasks: Todo[];
  doneTasks: Todo[];
  isModalOpen: boolean;
  setTodoTasks: (todoTasks: Todo[]) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setinProgressTasks: (inProgressTasks: Todo[]) => void;
  setinReviewTasks: (inReviewTasks: Todo[]) => void;
  setDoneTasks: (doneTasks: Todo[]) => void;
}
