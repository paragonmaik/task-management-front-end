import { TaskContext } from '../../context/TaskContext';
import { useContext, useEffect } from 'react';
import TaskDetailsModal from '../taskDetailsModal/TaskDetailsModal';
import { Columns } from '../columns/Columns';
import AddTaskModal from '../taskModal/AddTaskModal';
import dashBoardCSS from './dashBoard.module.css';
import { useAxios } from '../hooks/useAxios';
import { token } from '../../token';
import { sortDraggableList } from '../helpers/sortDraggableList';

function DashBoard() {
	const {
		createdColumns,
		isModalOpen,
		currentBoardState,
		setCurrentBoardState,
	} = useContext(TaskContext);

	const { response } = useAxios(
		{
			method: 'get',
			url: `/column/${currentBoardState._id}`,
			headers: {
				Authorization: token,
			},
		},
		[currentBoardState._id]
	);

	useEffect(() => {
		if (!response) return;
		const columnsList = response;
		setCurrentBoardState({ ...currentBoardState, columnsList });
	}, [response]);

	console.log(currentBoardState._id);
	sortDraggableList(response, currentBoardState.columns);

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
