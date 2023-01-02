import SideBarCSS from './sideBar.module.css';
import axios from 'axios';
import { FormEvent, useContext } from 'react';
import { token } from '../../token';
import { TaskContext } from '../../context/TaskContext';
import { board } from '../../typescript/types';
import { createBoard } from './SideBarController';

interface ISidebar {
	loading?: boolean;
	response?: board[] | null;
}

export default function SideBar({ response }: ISidebar) {
	const { createdBoards, setCreatedBoard } = useContext(TaskContext);

	return (
		<nav className={SideBarCSS.nav}>
			<div className={SideBarCSS.subMenuContainer}>
				{response ? <p>All boards ({response.length})</p> : null}
				{response
					? response.map(({ boardName, _id }) => <p key={_id}>{boardName}</p>)
					: null}
				<form onSubmit={(e) => createBoard(e, createdBoards, setCreatedBoard)}>
					<button
						type='submit'
						className={SideBarCSS.addBtn}
					>
						+Create new board
					</button>
					<input
						id='boardName'
						type='text'
						placeholder='new board name'
					/>
				</form>
			</div>
			<div className={SideBarCSS.subMenuContainer}>
				<button>Select theme</button>
				<button>Hide Sidebar</button>
			</div>
		</nav>
	);
}
