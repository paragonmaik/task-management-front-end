import { TaskContext } from '../../context/TaskContext';
import { useContext, useEffect } from 'react';
import TaskDetailsModal from '../taskDetailsModal/TaskDetailsModal';
import { Columns } from '../columns/Columns';
import AddTaskModal from '../taskModal/AddTaskModal';
import dashBoardCSS from './dashBoard.module.css';
import { useAxios } from '../hooks/useAxios';
import { token } from '../../token';
import { sortDraggableList } from '../helpers/sortDraggableList';
import { ColumnState } from '../../typescript/types';

function DashBoard() {
	const {
		isModalOpen,
		currentBoardState,
		setCurrentBoardState,
		createdColumns,
	} = useContext(TaskContext);

	const { response } = useAxios(
		{
			method: 'get',
			url: `/column/${currentBoardState._id}`,
			headers: {
				Authorization: token,
			},
		},
		[currentBoardState._id, createdColumns]
	);

	useEffect(() => {
		if (!response) return;
		const columnsList: ColumnState[] = response;
		columnsList.forEach((column) => {
			column.tasksList = [];
			if (column.tasks.length === 0) {
			}
		});
		setCurrentBoardState({ ...currentBoardState, columnsList });
	}, [response]);

	sortDraggableList(currentBoardState.columnsList, currentBoardState.columns);

	return (
		<div className={dashBoardCSS.bg}>
			{currentBoardState._id ? (
				<>
					<Columns />
				</>
			) : (
				<p>No board selected</p>
			)}
			{isModalOpen ? <AddTaskModal /> : null}
		</div>
	);
}

export default DashBoard;
