import { createContext, useState } from 'react';
import {
	TaskProviderProp,
	TaskContextType,
	ITasksState,
} from '../typescript/types';

export const TaskContext = createContext({} as TaskContextType);

export function TimerProvider({ children }: TaskProviderProp) {
	const [boards, setBoard] = useState<object[]>([]);
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
				boards,
				setIsModalOpen,
				setTasksState,
				setIsTaskDetailsOpen,
				setCurrentTaskId,
				setBoard,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}
