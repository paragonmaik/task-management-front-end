import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import HeaderCSS from './header.module.css';

export const Header = React.memo(() => {
	const { currentBoard } = useContext(TaskContext);

	const userLogout = () => {};

	return (
		<header className={HeaderCSS.bg}>
			<nav className={HeaderCSS.optionsContainer}>
				<div className={HeaderCSS.btnsContainer}>
					<button
						className={HeaderCSS.clearBtn}
						type='button'
						onClick={userLogout}
					>
						×
					</button>
				</div>
				{currentBoard.boardName ? (
					<p>{currentBoard.boardName}</p>
				) : (
					<p>Select or create a new board</p>
				)}
			</nav>
		</header>
	);
});
