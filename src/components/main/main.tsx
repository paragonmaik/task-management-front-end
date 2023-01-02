import MainCSS from './main.module.css';
import TasksContainer from '../container/TasksContainer';
import Header from '../header/Header';
import SideBar from '../sideBar/SideBar';
import { useAxios } from '../hooks/useAxios';
import { token } from '../../token';
import { TaskContext } from '../../context/TaskContext';
import { useContext } from 'react';

export function Main() {
	const { createdBoards } = useContext(TaskContext);

	const { response } = useAxios(
		{
			method: 'get',
			url: '/board',
			headers: {
				Authorization: token,
			},
		},
		createdBoards
	);

	return (
		<div className={MainCSS.container}>
			<Header />
			<div style={{ display: 'flex', marginTop: '81px' }}>
				<SideBar boardsList={response} />
				<div style={{ marginLeft: '220px' }}>
					<TasksContainer />
				</div>
			</div>
		</div>
	);
}
