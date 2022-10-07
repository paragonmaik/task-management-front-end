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
  id: string,
}

export type TaskContextType = {
  isModalOpen: boolean;
  tasksState: TasksState;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setTasksState: (tasksState: TasksState) => void;
}

export type DragIds = {
  colName: 'todo' | 'inProgress' | 'inReview' | 'done';
}

export interface TasksState {
  todo: { tasks: Todo[] };
  inProgress: { tasks: Todo[] };
  inReview: { tasks: Todo[] };
  done: { tasks: Todo[] };
}
