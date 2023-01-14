import SideBarCSS from './sideBar.module.css';
import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { board } from '../../typescript/types';
import { createBoard } from './SideBarController';
import { CreationForm } from '../sub-components/creationForm/CreationForm';

interface ISidebar {
	loading?: boolean;
	boardsList?: board[] | null;
	sidebarState: boolean;
	setSidebarState: (sidebarState: boolean) => void;
}

export default function SideBar({
	boardsList,
	sidebarState,
	setSidebarState,
}: ISidebar) {
	const {
		createdBoards,
		currentBoardState,
		authUser,
		setCreatedBoard,
		setCurrentBoardState,
	} = useContext(TaskContext);

	return (
		<nav
			className={sidebarState ? SideBarCSS.visibleNav : SideBarCSS.hiddenNav}
		>
			<div className={SideBarCSS.subMenuContainer}>
				{boardsList ? <p>All boards ({boardsList.length})</p> : null}
				<div className={SideBarCSS.boardNamesContainer}>
					{boardsList
						? boardsList.map(({ boardName, _id, columns }) => (
								<button
									className={SideBarCSS.selectBoardBtn}
									type='button'
									key={_id}
									id={_id}
									disabled={_id === currentBoardState._id ? true : false}
									onClick={() => {
										setCurrentBoardState({ _id, boardName, columns });
									}}
								>
									{boardName}
								</button>
						  ))
						: null}
				</div>
				<CreationForm
					createComponent={createBoard}
					config={{
						createdComponent: createdBoards,
						setCreatedComponent: setCreatedBoard,
						token: authUser.token,
						type: 'board',
					}}
				/>
			</div>
			<div className={SideBarCSS.optionsContainer}>
				<button>Select theme</button>
				<button
					onClick={() => {
						setSidebarState(!sidebarState);
					}}
				>
					Hide Sidebar
				</button>
			</div>
		</nav>
	);
}
