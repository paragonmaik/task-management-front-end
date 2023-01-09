import { ReactNode } from 'react';

export type board = {
	boardName: string;
	_id: string;
	columns?: string[];
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
	ownerColumn?: string;
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

export interface TaskState extends task {
	subTasks?: string[];
}

export interface ColumnState extends column {
	ownerBoard: string;
	tasks: string[];
	tasksList: TaskState[];
}

export interface BoardState {
	boardName: string;
	columns?: string[];
	columnsList?: ColumnState[];
	_id: string;
}

export type TaskContextType = {
	createdBoards: board[];
	createdColumns: column[];
	currentColumn: column;
	createdTasks: task[];
	isModalOpen: boolean;
	currentBoardState: BoardState;
	setIsModalOpen: (isModalOpen: boolean) => void;
	setCreatedBoard: (createdBoards: board[]) => void;
	setCreatedColumns: (createdColumns: column[]) => void;
	setCurrentColumn: (currentColumn: column) => void;
	setCreatedTasks: (createdTasks: task[]) => void;
	setCurrentBoardState: (currentBoardState: BoardState) => void;
};
