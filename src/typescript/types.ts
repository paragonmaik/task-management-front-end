import { ReactNode } from 'react';

export type ColumnProps = {
  colName: 'To do' | 'In Progress' | 'In Review' | 'Done';
}

export type TaskProviderProp = {
  children: ReactNode;
}

export type TaskContextType = {
  todoTasks: Todo[];
  setTodoTasks: (todoTasks: Todo[]) => void;
}

export interface Todo {
  title: string,
  description: string,
  id?: number,
}