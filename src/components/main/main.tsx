import MainCSS from './main.module.css';
import React from 'react';
import TasksContainer from '../container/TasksContainer';
import Header from '../header/Header';
import SideBar from '../sideBar/SideBar';
import { useAxios } from '../hooks/useAxios';
import { token } from '../../token';

interface IChildren {
	children: React.ReactNode;
}

export function Main() {
	const { response, loading, error } = useAxios({
		method: 'get',
		url: '/board',
		headers: {
			Authorization: token,
		},
	});
	console.log(response);
	return (
		<div className={MainCSS.container}>
			<Header />
			<div style={{ display: 'flex', marginTop: '81px' }}>
				<SideBar
					loading={loading}
					boardsList={response}
				/>
				<div style={{ marginLeft: '220px' }}>
					<TasksContainer />
				</div>
			</div>
		</div>
	);
}
