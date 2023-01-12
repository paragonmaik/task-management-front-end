import { TaskContext } from '../../context/TaskContext';
import { useContext, useEffect } from 'react';
import { Columns } from '../columns/Columns';
import AddTaskModal from '../taskModal/AddTaskModal';
import dashBoardCSS from './dashBoard.module.css';
import { useAxios } from '../hooks/useAxios';
import { sortDraggableList } from '../helpers/sortDraggableList';
import { addColumnsToState } from './DashBoardController';

function DashBoard() {
	const { isModalOpen, currentBoardState, setCurrentBoardState, authUser } =
		useContext(TaskContext);

	const { response } = useAxios(
		{
			method: 'get',
			url: `/column/${currentBoardState._id}`,
			headers: {
				Authorization: authUser.token,
			},
		},
		[currentBoardState._id]
	);

	useEffect(() => {
		addColumnsToState({ response, currentBoardState, setCurrentBoardState });
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
