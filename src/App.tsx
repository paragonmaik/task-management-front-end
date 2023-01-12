import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import { TaskContext } from './context/TaskContext';
import { Main } from './components/main/Main';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { ProtectedRoutes } from './ProtectedRoutes';

function App() {
	const { authUser } = useContext(TaskContext);
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Navigate to='/login' />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route element={<ProtectedRoutes isUserAuth={authUser.logged} />}>
					<Route
						path='/home'
						element={<Main />}
					/>
				</Route>
				<Route
					path='*'
					element={<div>NOT FOUND</div>}
				/>
			</Routes>
		</Router>
	);
}

export default App;
