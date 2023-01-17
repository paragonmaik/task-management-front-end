import { createContext, useState } from 'react';
import {
	TaskProviderProp,
	TaskContextType,
	board,
	column,
	task,
	BoardState,
	UserAuth,
} from '../typescript/types';

const authUserDefault = {
	email: '',
	token: '',
	logged: false,
};
const boardStateDefault = {
	boardName: '',
	columns: [],
	columnsList: [],
	_id: '',
};

export const TaskContext = createContext({} as TaskContextType);

export function TaskProvider({ children }: TaskProviderProp) {
	const [createdBoards, setCreatedBoard] = useState<board[]>([]);
	const [createdTasks, setCreatedTasks] = useState<task[]>([]);
	const [currentColumn, setCurrentColumn] = useState<column>({} as column);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [authUser, setAuthUser] = useState<UserAuth>(authUserDefault);

	const [currentBoardState, setCurrentBoardState] =
		useState<BoardState>(boardStateDefault);
	// -----------------------

	return (
		<TaskContext.Provider
			value={{
				isModalOpen,
				createdBoards,
				currentColumn,
				createdTasks,
				currentBoardState,
				authUser,
				setIsModalOpen,
				setCreatedBoard,
				setCurrentColumn,
				setCreatedTasks,
				setCurrentBoardState,
				setAuthUser,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}
