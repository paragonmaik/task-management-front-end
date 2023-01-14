import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext';
import { userLogout } from './HeaderController';
import HeaderCSS from './header.module.css';

export const Header = React.memo(() => {
	const { currentBoardState, setAuthUser, authUser } = useContext(TaskContext);
	const navigate = useNavigate();

	return (
		<header className={HeaderCSS.bg}>
			<nav className={HeaderCSS.optionsContainer}>
				<h1>kanban board</h1>
				<p className={HeaderCSS.boardNameContainer}>
					{currentBoardState.boardName
						? currentBoardState.boardName
						: 'Select or create a new board'}
				</p>
				<div className={HeaderCSS.btnsContainer}>
					<button
						className={HeaderCSS.logoutBtn}
						type='button'
						onClick={() => userLogout(authUser, setAuthUser, navigate)}
					>
						×
					</button>
				</div>
			</nav>
		</header>
	);
});
