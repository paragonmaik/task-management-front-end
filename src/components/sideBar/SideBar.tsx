import SideBarCSS from './sideBar.module.css';
import axios from 'axios';
import { FormEvent } from 'react';
import { token } from '../../token';

export default function SideBar() {
	async function createBoard(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const {
			boardName: { value },
		} = e.target as typeof e.currentTarget;
		e.currentTarget.reset();
		if (!value) return;

		await axios.post(
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
	}

	return (
		<nav className={SideBarCSS.nav}>
			<div className={SideBarCSS.subMenuContainer}>
				<p>All boards (quantidade)</p>
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
