import { FormEvent } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { useContext, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { column, ITasksState } from '../../typescript/types';
import { useLocalStorage } from '../../utils/useLocalStorage';
import TaskDetailsModal from '../taskDetailsModal/TaskDetailsModal';
import Column from '../column/Column';
import TaskModal from '../taskModal/TaskModal';
import dashBoardCSS from './dashBoard.module.css';
import { useAxios } from '../hooks/useAxios';
import { token } from '../../token';
import { board } from '../../typescript/types';
import { axiosRequest } from '../helpers/axiosRequest';

function DashBoard() {
	const {
		isModalOpen,
		tasksState,
		isTaskDetailsOpen,
		setTasksState,
		currentTaskId,
		currentBoard,
		createdColumns,
		setCreatedColumns,
	} = useContext(TaskContext);
	const [state, setState] = useLocalStorage<ITasksState>(
		'tasksState',
		tasksState
	);

	const { response } = useAxios(
		{
			method: 'get',
			url: `/column/${currentBoard._id}`,
			headers: {
				Authorization: token,
			},
		},
		[currentBoard]
	);

	const columnsList: column[] | null = response;

	console.log(response);

	const createColumn = async (e: FormEvent<HTMLFormElement>) => {
		const columns = createdColumns;
		const maxColumnNameLength = 15;

		e.preventDefault();

		const {
			columnName: { value },
		} = e.target as typeof e.currentTarget;

		e.currentTarget.reset();

		if (!value) {
			throw new Error('Column name is required!');
		}

		if (value.length > maxColumnNameLength) {
			throw new Error('Column name should only be 14 characters long!');
		}

		console.log(value);
		const response = await axiosRequest({
			url: `/column/${currentBoard._id}`,
			method: 'post',
			data: {
				columnName: value,
			},
			headers: {
				Authorization: token,
			},
		});

		columns.push(response.data);
		setCreatedColumns([...columns]);

		console.log(createdColumns);
	};

	// ------------------

	const handleOnDragEnd = (result: DropResult) => {
		const { destination, source } = result;
		if (!destination) {
			return;
		}

		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		) {
			return;
		}

		if (!state) return;

		const taskCopy = {
			...state[source.droppableId as keyof ITasksState].tasks[source.index],
		};
		state[source.droppableId as keyof ITasksState].tasks.splice(
			source.index,
			1
		);
		state[destination.droppableId as keyof ITasksState].tasks.splice(
			destination.index,
			0,
			taskCopy
		);

		setState(state);
	};

	useEffect(() => {
		setTasksState(state);
	}, []);

	return (
		<div className={dashBoardCSS.bg}>
			{currentBoard._id ? (
				<DragDropContext onDragEnd={handleOnDragEnd}>
					{columnsList?.map(({ _id, columnName }) => (
						<Column
							key={_id}
							colName={columnName}
						/>
					))}

					<form onSubmit={(e) => createColumn(e)}>
						<input
							id='columnName'
							type='text'
							placeholder='add new column'
						/>
						<button type='submit'>+</button>
					</form>
				</DragDropContext>
			) : (
				<p>No board selected</p>
			)}
			{isModalOpen && <TaskModal />}
			{isTaskDetailsOpen && <TaskDetailsModal id={currentTaskId} />}
		</div>
	);
}

export default DashBoard;
