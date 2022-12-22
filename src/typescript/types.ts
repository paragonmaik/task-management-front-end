import { ReactNode } from 'react';

export type ColumnProps = {
  colName: 'To do' | 'In Progress' | 'In Review' | 'Done';
}

export type TaskProviderProp = {
  children: ReactNode;
}

export type currentTaskId = {
  id: string;
}

export type TaskContextType = {
  isModalOpen: boolean;
  isTaskDetailsOpen: boolean;
  tasksState: ITasksState;
  currentTaskId: string;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setTasksState: (tasksState: ITasksState) => void;
  setIsTaskDetailsOpen: (isTaskDetailsOpen: boolean) => void;
  setCurrentTaskId: (currentTaskId: string) => void;
}

export type DragIDs = {
  colName: 'todo' | 'inProgress' | 'inReview' | 'done';
}

export interface ISubTasks {
  description: string;
  id: string;
}

export interface ITask {
  description: string;
  id: string;
  subTasks: ISubTasks[];
}

export interface ITasksState {
  todo: { tasks: ITask[] };
  inProgress: { tasks: ITask[] };
  inReview: { tasks: ITask[] };
  done: { tasks: ITask[] };
}
