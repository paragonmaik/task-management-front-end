import HomeCSS from './home.module.css';
import DashBoard from '../dashBoard/DashBoard';
import { Header } from '../header/Header';
import { useAxios } from '../hooks/useAxios';
import { TaskContext } from '../../context/TaskContext';
import { useContext, useState } from 'react';
import SideBar from '../sideBar/SideBar';

export function Home() {
	const { createdBoards, currentBoardState, authUser } =
		useContext(TaskContext);
	const [sidebarState, setSidebarState] = useState(true);

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
				<SideBar
					boardsList={response}
					sidebarState={sidebarState}
					setSidebarState={setSidebarState}
				/>
				<div className={sidebarState ? HomeCSS.visibleNav : HomeCSS.hiddenNav}>
					<DashBoard />
				</div>
			</div>
		</div>
	);
}
