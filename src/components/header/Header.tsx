import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { initialState } from '../../utils/initialTasksState';
import { useLocalStorage } from '../../utils/useLocalStorage';
import HeaderCSS from './header.module.css';

function Header() {
	const {
		isModalOpen,
		setIsModalOpen,
		tasksState,
		setTasksState,
		currentBoard,
	} = useContext(TaskContext);
	const [state, setState] = useLocalStorage('tasksState', tasksState);

	const handleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleClearBoard = () => {
		setState(initialState);
		setTasksState(initialState);

		window.location.reload();
	};

	return (
		<header className={HeaderCSS.bg}>
			<nav className={HeaderCSS.optionsContainer}>
				<div className={HeaderCSS.btnsContainer}>
					<button
						className={HeaderCSS.addBtn}
						type='button'
						onClick={handleModal}
					>
						+
					</button>
					<button
						className={HeaderCSS.clearBtn}
						type='button'
						onClick={handleClearBoard}
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
}

export default Header;
