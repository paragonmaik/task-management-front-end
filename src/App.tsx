import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { Main } from './components/main/Main';
import { Login } from './components/login/Login';

function App() {
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
					element={<Login />}
				/>
				<Route
					path='/home'
					element={<Main />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
