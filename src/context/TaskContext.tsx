import { createContext, useState } from 'react';
import {
	TaskProviderProp,
	TaskContextType,
	board,
	column,
	task,
	BoardState,
} from '../typescript/types';

export const TaskContext = createContext({} as TaskContextType);

export function TaskProvider({ children }: TaskProviderProp) {
	const [createdBoards, setCreatedBoard] = useState<board[]>([]);
	const [createdColumns, setCreatedColumns] = useState<column[]>([]);
	const [createdTasks, setCreatedTasks] = useState<task[]>([]);
	const [currentBoard, setCurrentBoard] = useState<board>({} as board);
	const [currentColumn, setCurrentColumn] = useState<column>({} as column);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [currentBoardState, setCurrentBoardState] = useState<BoardState>({
		boardName: '',
		columns: [],
		columnsList: [],
		_id: '',
	});
	// -----------------------

	return (
		<TaskContext.Provider
			value={{
				isModalOpen,
				createdBoards,
				currentBoard,
				createdColumns,
				currentColumn,
				createdTasks,
				currentBoardState,
				setIsModalOpen,
				setCreatedBoard,
				setCurrentBoard,
				setCreatedColumns,
				setCurrentColumn,
				setCreatedTasks,
				setCurrentBoardState,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}
