export type TaskMap = {
  [columnName: string]: Task[];
};

export type Board = {
  boardName: string;
  _id: string;
  columns?: string[];
};

export type Column = {
  columnName: string;
  _id: string;
  tasks?: string[];
};

export type Task = {
  description: string;
  _id: string;
  ownerColumn?: string;
  subTasks?: string[];
};

export type TaskContextType = {
  currentColumn: Column;
  isModalOpen: boolean;
  isEditModalOpen: boolean;
  currentTask: Task;
  currentBoardIdx: number;
  currentTasksMap: TaskMap;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsEditModalOpen: (isModalOpen: boolean) => void;
  setCurrentColumn: (currentColumn: Column) => void;
  setCurrentTask: (currentTask: Task) => void;
  setCurrentBoardIdx: (currentColumnIdx: number) => void;
  setCurrentTasksMap: (currentTasksList: TaskMap) => void;
};
