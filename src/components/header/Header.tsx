import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext';
import HeaderCSS from './header.module.css';
import { userLogout } from './HeaderController';

export const Header = React.memo(() => {
	const { currentBoardState, setAuthUser, authUser } = useContext(TaskContext);
	const navigate = useNavigate();

	return (
		<header className={HeaderCSS.bg}>
			<nav className={HeaderCSS.optionsContainer}>
				<div className={HeaderCSS.btnsContainer}>
					<button
						className={HeaderCSS.clearBtn}
						type='button'
						onClick={() => userLogout(authUser, setAuthUser, navigate)}
					>
						×
					</button>
				</div>
				{currentBoardState.boardName ? (
					<p>{currentBoardState.boardName}</p>
				) : (
					<p>Select or create a new board</p>
				)}
			</nav>
		</header>
	);
});
