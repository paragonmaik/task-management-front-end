import { TaskContext } from '../../context/TaskContext';
import { useContext } from 'react';
import TaskDetailsModal from '../taskDetailsModal/TaskDetailsModal';
import { Columns } from '../columns/Columns';
import AddTaskModal from '../taskModal/AddTaskModal';
import dashBoardCSS from './dashBoard.module.css';
import { useAxios } from '../hooks/useAxios';
import { token } from '../../token';
import { sortDraggableList } from '../helpers/sortDraggableList';

function DashBoard() {
	const { currentBoard, createdColumns, isModalOpen } = useContext(TaskContext);

	const { response } = useAxios(
		{
			method: 'get',
			url: `/column/${currentBoard._id}`,
			headers: {
				Authorization: token,
			},
		},
		[currentBoard, createdColumns]
	);

	sortDraggableList(response, currentBoard.columns);

	return (
		<div className={dashBoardCSS.bg}>
			{currentBoard._id ? (
				<>
					<Columns columnsList={response} />
				</>
			) : (
				<p>No board selected</p>
			)}
			{isModalOpen ? <AddTaskModal /> : null}
		</div>
	);
}

export default DashBoard;
