import SideBarCSS from './sideBar.module.css';
import axios from 'axios';
import { FormEvent } from 'react';

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
					Authorization:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRvbmtleWtvbmciLCJlbWFpbCI6ImRvbmtleUBleGFtcGxlLmNvbSIsImlhdCI6MTY3MjUwODQ3MX0.GP3-t_4GnM33vQT2qFAUDqAcJc_ph5_U96yeKtkeSZw',
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
