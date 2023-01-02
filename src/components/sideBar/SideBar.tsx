import SideBarCSS from './sideBar.module.css';
import axios from 'axios';
import { FormEvent, useContext } from 'react';
import { token } from '../../token';
import { TaskContext } from '../../context/TaskContext';
import { board } from '../../typescript/types';

interface ISidebar {
	loading?: boolean;
	response?: board[] | null;
}

export default function SideBar({ response }: ISidebar) {
	const { createdBoards, setCreatedBoard } = useContext(TaskContext);

	async function createBoard(e: FormEvent<HTMLFormElement>) {
		const tempBoards = createdBoards;
		e.preventDefault();
		const {
			boardName: { value },
		} = e.target as typeof e.currentTarget;
		e.currentTarget.reset();
		if (!value) return;

		const response = await axios.post(
			'http://localhost:3000/board',
			{
				boardName: value,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		tempBoards.push(response.data);
		setCreatedBoard([...tempBoards]);
	}

	return (
		<nav className={SideBarCSS.nav}>
			<div className={SideBarCSS.subMenuContainer}>
				{response ? <p>All boards ({response.length})</p> : null}
				{response
					? response.map(({ boardName, _id }) => <p key={_id}>{boardName}</p>)
					: null}
				<form onSubmit={(e) => createBoard(e)}>
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
