import { createContext, useState } from 'react';
import {
	TaskProviderProp,
	TaskContextType,
	ITasksState,
	board,
	column,
	task,
} from '../typescript/types';

export const TaskContext = createContext({} as TaskContextType);

export function TaskProvider({ children }: TaskProviderProp) {
	const [createdBoards, setCreatedBoard] = useState<board[]>([]);
	const [createdColumns, setCreatedColumns] = useState<column[]>([]);
	const [createdTasks, setCreatedTasks] = useState<task[]>([]);
	const [currentBoard, setCurrentBoard] = useState<board>({} as board);
	const [currentColumn, setCurrentColumn] = useState<column>({} as column);

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
				currentColumn,
				createdTasks,
				setIsModalOpen,
				setTasksState,
				setIsTaskDetailsOpen,
				setCurrentTaskId,
				setCreatedBoard,
				setCurrentBoard,
				setCreatedColumns,
				setCurrentColumn,
				setCreatedTasks,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}
