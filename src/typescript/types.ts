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
	draggableTasksList: task[][];
	currentBoardState: any;
	setIsModalOpen: (isModalOpen: boolean) => void;
	setCreatedBoard: (createdBoards: board[]) => void;
	setCurrentBoard: (currentBoard: board) => void;
	setCreatedColumns: (createdColumns: column[]) => void;
	setCurrentColumn: (currentColumn: column) => void;
	setCreatedTasks: (createdTasks: task[]) => void;
	setDraggableTasksList: (draggableTasksList: task[][]) => void;
	setCurrentBoardState: (currentBoardState: any) => void;
};
