import { createContext, useState } from 'react';
import {
	TaskProviderProp,
	TaskContextType,
	ITasksState,
	board,
	column,
} from '../typescript/types';

export const TaskContext = createContext({} as TaskContextType);

export function TaskProvider({ children }: TaskProviderProp) {
	const [createdBoards, setCreatedBoard] = useState<board[]>([]);
	const [currentBoard, setCurrentBoard] = useState<board>({} as board);
	const [createdColumns, setCreatedColumns] = useState<column[]>([]);

	// -----------------------
	const [currentTaskId, setCurrentTaskId] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
	const [tasksState, setTasksState] = useState<ITasksState>({
		todo: {
			tasks: [],
		},
		inProgress: {
			tasks: [],
		},
		inReview: {
			tasks: [],
		},
		done: {
			tasks: [],
		},
	});

	return (
		<TaskContext.Provider
			value={{
				isModalOpen,
				tasksState,
				isTaskDetailsOpen,
				currentTaskId,
				createdBoards,
				currentBoard,
				createdColumns,
				setIsModalOpen,
				setTasksState,
				setIsTaskDetailsOpen,
				setCurrentTaskId,
				setCreatedBoard,
				setCurrentBoard,
				setCreatedColumns,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}
