import { createContext, useState } from 'react';
import {
	TaskProviderProp,
	TaskContextType,
	ITasksState,
	board,
} from '../typescript/types';

export const TaskContext = createContext({} as TaskContextType);

export function TaskProvider({ children }: TaskProviderProp) {
	const [createdBoards, setCreatedBoard] = useState<board[]>([]);
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
				setIsModalOpen,
				setTasksState,
				setIsTaskDetailsOpen,
				setCurrentTaskId,
				setCreatedBoard,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}
