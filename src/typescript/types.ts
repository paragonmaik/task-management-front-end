import { ReactNode } from 'react';

export type board = {
	boardName: string;
	_id: string;
};

export interface IAxios {
	url: string;
	method: 'get' | 'post' | 'patch' | 'put' | 'delete';
	data?: object;
	headers?: object;
}

export type ColumnProps = {
	colName: string;
};

export type TaskProviderProp = {
	children: ReactNode;
};

export type currentTaskId = {
	id: string;
};

export type TaskContextType = {
	createdBoards: board[];
	currentBoard: board;
	isModalOpen: boolean;
	isTaskDetailsOpen: boolean;
	tasksState: ITasksState;
	currentTaskId: string;
	setIsModalOpen: (isModalOpen: boolean) => void;
	setTasksState: (tasksState: ITasksState) => void;
	setIsTaskDetailsOpen: (isTaskDetailsOpen: boolean) => void;
	setCurrentTaskId: (currentTaskId: string) => void;
	setCreatedBoard: (createdBoards: board[]) => void;
	setCurrentBoard: (createdBoards: board) => void;
};

export type DragIDs = {
	colName: 'todo' | 'inProgress' | 'inReview' | 'done';
};

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
