import SideBarCSS from './sideBar.module.css';
import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { board } from '../../typescript/types';
import { createBoard } from './SideBarController';

interface ISidebar {
	loading?: boolean;
	boardsList?: board[] | null;
}

export default function SideBar({ boardsList }: ISidebar) {
	const {
		createdBoards,
		setCreatedBoard,
		setCurrentBoardState,
		currentBoardState,
	} = useContext(TaskContext);

	return (
		<nav className={SideBarCSS.nav}>
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
				<form onSubmit={(e) => createBoard(e, createdBoards, setCreatedBoard)}>
					<input
						id='boardName'
						type='text'
						placeholder='new board name'
					/>
					<button
						type='submit'
						className={SideBarCSS.addBtn}
					>
						+
					</button>
				</form>
			</div>
			<div className={SideBarCSS.subMenuContainer}>
				<button>Select theme</button>
				<button>Hide Sidebar</button>
			</div>
		</nav>
	);
}
