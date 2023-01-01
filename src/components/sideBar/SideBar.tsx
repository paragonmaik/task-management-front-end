import { useContext } from 'react';
import SideBarCSS from './sideBar.module.css';
import axios from 'axios';
import { FormEvent } from 'react';
import { token } from '../../token';
import { TaskContext } from '../../context/TaskContext';

export default function SideBar() {
	const { boards } = useContext(TaskContext);

	async function createBoard(e: FormEvent<HTMLFormElement>) {
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
		boards.push(response.data);
	}

	return (
		<nav className={SideBarCSS.nav}>
			<div className={SideBarCSS.subMenuContainer}>
				<p>All boards ({boards.length})</p>
				{boards.map(({ boardName, _id }) => (
					<p key={_id}>{boardName}</p>
				))}
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
