import { ReactNode } from 'react';

export type board = {
	boardName: string;
	_id: string;
	columns?: column[];
};

export type column = {
	columnName: string;
	_id: string;
};

export type DraggableColumn = {
	columnName: string;
	_id: string;
	position: number;
};

export type task = {
	description: string;
	_id: string;
};

export interface IAxios {
	url: string;
	method: 'get' | 'post' | 'patch' | 'put' | 'delete';
	data?: object;
	headers?: object;
}

export type TaskProviderProp = {
	children: ReactNode;
};

export type currentTaskId = {
	id: string;
};

export type TaskContextType = {
	createdBoards: board[];
	currentBoard: board;
	createdColumns: column[];
	currentColumn: column;
	createdTasks: task[];
	isModalOpen: boolean;
	setIsModalOpen: (isModalOpen: boolean) => void;
	setCreatedBoard: (createdBoards: board[]) => void;
	setCurrentBoard: (currentBoard: board) => void;
	setCreatedColumns: (createdColumns: column[]) => void;
	setCurrentColumn: (currentColumn: column) => void;
	setCreatedTasks: (createdTasks: task[]) => void;
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
