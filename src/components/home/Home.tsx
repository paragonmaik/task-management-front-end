import HomeCSS from './home.module.css';
import DashBoard from '../dashBoard/DashBoard';
import { Header } from '../header/Header';
import SideBar from '../sideBar/SideBar';
import { useAxios } from '../hooks/useAxios';
import { TaskContext } from '../../context/TaskContext';
import { useContext } from 'react';

export function Home() {
	const { createdBoards, currentBoardState, authUser } =
		useContext(TaskContext);

	const { response } = useAxios(
		{
			method: 'get',
			url: '/board',
			headers: {
				Authorization: authUser.token,
			},
		},
		[createdBoards, currentBoardState._id]
	);

	return (
		<div className={HomeCSS.container}>
			<Header />
			<div className={HomeCSS.boardContainer}>
				<SideBar boardsList={response} />
				<div className={HomeCSS.dashboardContainer}>
					<DashBoard />
				</div>
			</div>
		</div>
	);
}
